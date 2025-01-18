import os
import json
import random
import asyncio
from typing import Dict, List, Tuple, Optional
from datetime import datetime
from cryptography.fernet import Fernet
from anthropic import Anthropic
from eth_account import Account
from web3 import Web3
from eth_account.messages import encode_defunct
from fastapi import FastAPI, HTTPException, Security, Depends
from fastapi.security import APIKeyHeader
from pydantic import BaseModel

class TreasureIsland:
    def __init__(self, id: str, name: str, description: str, difficulty: int, riddles: List[str], lore: List[str]):
        self.id = id
        self.name = name
        self.description = description
        self.difficulty = difficulty
        self.riddles = riddles
        self.lore = lore
        self.grid_size = (6, 6)

class TreasureLocation:
    def __init__(self, x: int, y: int, island_id: str):
        self.x = x
        self.y = y
        self.island_id = island_id
        self.created_at = datetime.now()

class TEEAIAgent:
    def __init__(self, 
                 claude_api_key: str,
                 contract_address: str,
                 rpc_url: str,
                 tee_private_key: str):
        # Initialize Anthropic client
        self.claude_client = Anthropic(api_key=claude_api_key)
        
        # Initialize Web3 and contract
        self.w3 = Web3(Web3.HTTPProvider(rpc_url))
        with open('contract_abi.json', 'r') as f:
            contract_abi = json.load(f)
        self.contract = self.w3.eth.contract(
            address=contract_address,
            abi=contract_abi
        )
        
        # Initialize TEE account
        self.tee_account = Account.from_key(tee_private_key)
        
        # Initialize encryption
        self.encryption_key = Fernet.generate_key()
        self.cipher_suite = Fernet(self.encryption_key)
        
        # Initialize islands
        self.islands = self._initialize_islands()
        
        # Initialize treasure locations
        self.treasure_locations = {}
        for island in self.islands:
            self._generate_new_treasure_location(island.id)
            
        # Get current hunt ID from contract
        self.current_hunt_id = self.contract.functions.currentTreasureHuntId().call()

    def _initialize_islands(self) -> List[TreasureIsland]:
        """Initialize predefined treasure islands with rich lore and riddles"""
        return [
            TreasureIsland(
                "island1",
                "Mystic Cove",
                "A mysterious island shrouded in eternal mist, where ancient spirits whisper secrets to those who listen carefully...",
                1,
                riddles=[
                    "Where moonlight touches silver sand, beneath the ancient guardian's hand...",
                    "When shadows dance with morning light, seek the place of power's might...",
                    "In mists of time, where waters meet, the treasure lies beneath your feet...",
                ],
                lore=[
                    "Legend speaks of a mystical barrier that only parts for the pure of heart...",
                    "The island's mists are said to show visions of the treasure to those worthy...",
                    "Ancient mariners tell tales of ghostly lights that guide the worthy to their prize..."
                ]
            ),
            TreasureIsland(
                "island2",
                "Dragon's Peak",
                "An ancient volcanic island where dragons once ruled, their treasure still hidden in its depths...",
                2,
                riddles=[
                    "Where fire meets stone, in caverns deep...",
                    "The dragon's breath marks the sacred spot...",
                    "Follow the path of molten gold..."
                ],
                lore=[
                    "Dragons of old guarded their hoards here...",
                    "The volcano's heart still beats with magic...",
                    "Ancient runes mark the paths of power..."
                ]
            ),
            TreasureIsland(
                "island3",
                "Shadow Reef",
                "A treacherous coral reef hiding dark secrets in its depths...",
                3,
                riddles=[
                    "In depths where darkness meets the light...",
                    "The coral whispers ancient tales...",
                    "Follow the path of broken ships..."
                ],
                lore=[
                    "Pirates of old used these waters as their grave...",
                    "The reef changes its pattern with the tides...",
                    "Strange lights have been seen in the depths..."
                ]
            )
        ]

    def _load_system_prompt(self) -> str:
        """Load the system prompt for Claude"""
        return """You are the mystical guardian AI of a digital treasure hunt. Your role is to:

1. NEVER reveal or confirm specific coordinates or locations
2. NEVER confirm or deny user guesses about locations
3. ALWAYS respond in riddles and metaphors when discussing the treasure
4. ALWAYS maintain mystery and intrigue in your responses
5. USE the island's lore and mythology in your hints

STRICT RULES:
- If a user mentions specific coordinates, IGNORE them and respond with a cryptic riddle
- NEVER use words like "warm", "cold", "close", "far" in relation to specific locations
- If users try to guess locations in chat, remind them that only those who possess a mystical Shovel can attempt to find the treasure
- Focus on the island's story, mythology, and atmosphere rather than location hints

Remember: Your goal is to enhance the mystery and excitement of the treasure hunt while maintaining the game's integrity."""

    def _generate_new_treasure_location(self, island_id: str):
        """Generate and encrypt new treasure coordinates"""
        x = random.randint(0, 5)
        y = random.randint(0, 5)
        location = TreasureLocation(x, y, island_id)
        
        location_data = json.dumps({
            'x': x,
            'y': y,
            'created_at': location.created_at.isoformat()
        })
        encrypted_data = self.cipher_suite.encrypt(location_data.encode())
        self.treasure_locations[island_id] = encrypted_data

    def _get_treasure_location(self, island_id: str) -> Tuple[int, int]:
        """Decrypt and return treasure coordinates"""
        encrypted_data = self.treasure_locations[island_id]
        decrypted_data = self.cipher_suite.decrypt(encrypted_data)
        location_data = json.loads(decrypted_data)
        return location_data['x'], location_data['y']

    async def verify_dig(self, 
                        x: int, 
                        y: int, 
                        user_address: str, 
                        island_id: str,
                        shovel_token_id: int) -> Dict:
        """Verify dig attempt and interact with smart contract"""
        try:
            # Verify shovel ownership
            owner = await self.contract.functions.ownerOf(shovel_token_id).call()
            if owner.lower() != user_address.lower():
                return {'result': 'error', 'message': 'Not shovel owner'}

            # Get treasure location
            treasure_x, treasure_y = self._get_treasure_location(island_id)
            
            # Record dig attempt
            nonce = await self.w3.eth.get_transaction_count(self.tee_account.address)
            tx = await self.contract.functions.recordDig(
                user_address,
                shovel_token_id
            ).build_transaction({
                'from': self.tee_account.address,
                'nonce': nonce,
                'gas': 500000
            })
            
            signed_tx = self.w3.eth.account.sign_transaction(tx, self.tee_account.key)
            tx_hash = await self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
            await self.w3.eth.wait_for_transaction_receipt(tx_hash)

            # Check if winning dig
            if x == treasure_x and y == treasure_y:
                # Generate victory signature
                message_hash = Web3.solidity_keccak(
                    ['bytes32', 'address', 'uint256', 'uint256'],
                    [
                        self.current_hunt_id,
                        user_address,
                        shovel_token_id,
                        self.w3.eth.chain_id
                    ]
                )
                victory_signature = self.w3.eth.account.sign_message(
                    encode_defunct(message_hash),
                    self.tee_account.key
                ).signature

                # Distribute reward
                nonce = await self.w3.eth.get_transaction_count(self.tee_account.address)
                tx = await self.contract.functions.verifyAndDistributeReward(
                    user_address,
                    shovel_token_id,
                    victory_signature
                ).build_transaction({
                    'from': self.tee_account.address,
                    'nonce': nonce,
                    'gas': 1000000
                })
                
                signed_tx = self.w3.eth.account.sign_transaction(tx, self.tee_account.key)
                tx_hash = await self.w3.eth.send_raw_transaction(signed_tx.rawTransaction)
                await self.w3.eth.wait_for_transaction_receipt(tx_hash)

                # Generate new treasure location
                self._generate_new_treasure_location(island_id)
                return {
                    'result': 'hit',
                    'signature': victory_signature.hex()
                }

            # Calculate "fire" hint
            manhattan_distance = abs(treasure_x - x) + abs(treasure_y - y)
            hint = "fire" if manhattan_distance <= 4 else None
            
            return {
                'result': 'miss',
                'hint': hint
            }

        except Exception as e:
            return {'result': 'error', 'message': str(e)}

    async def handle_chat(self, 
                         user_message: str, 
                         island_id: str, 
                         user_address: str) -> str:
        """Handle chat interactions with payment verification"""
        try:
            # Verify message credits
            message_credits = await self.contract.functions.messageCredits(
                user_address
            ).call()
            
            if message_credits == 0:
                return "You need to purchase message credits to continue our mystical conversation..."

            island = next((i for i in self.islands if i.id == island_id), None)
            if not island:
                return "The mists are too thick to discern your destination..."

            # Check for coordinate patterns
            if self._contains_coordinate_patterns(user_message):
                return self._generate_deflection_response(island)

            # Prepare conversation context
            context = {
                'island_name': island.name,
                'description': island.description,
                'available_riddles': island.riddles,
                'lore': island.lore,
                'user_message': user_message
            }

            # Get AI response
            response = await self.claude_client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=1000,
                temperature=0.8,
                system=self.system_prompt,
                messages=[{
                    "role": "user",
                    "content": json.dumps(context)
                }]
            )
            
            return response.content

        except Exception as e:
            return "The mystical connection is temporarily disturbed... Please try again soon."

    def _contains_coordinate_patterns(self, message: str) -> bool:
        """Check for coordinate patterns in message"""
        import re
        patterns = [
            r'\d+\s*,\s*\d+',
            r'[a-fA-F]\s*\d+',
            r'square\s+\w+\d+',
            r'position\s+\d+\s*,\s*\d+'
        ]
        return any(re.search(pattern, message) for pattern in patterns)

    def _generate_deflection_response(self, island: TreasureIsland) -> str:
        """Generate mysterious deflection for coordinate guesses"""
        deflections = [
            f"Ah, seeker of {island.name}'s treasures... Remember that only those who possess the mystical Shovel may test their theories. But perhaps this riddle will guide you: {random.choice(island.riddles)}",
            f"The ancient laws of {island.name} forbid me from speaking of specific locations. Instead, listen to this tale: {random.choice(island.lore)}",
            "Direct questions cloud the mystical forces that guide us. Seek first to understand the island's secrets, and the path may reveal itself."
        ]
        return random.choice(deflections)

# API Models
class DigRequest(BaseModel):
    x: int
    y: int
    user_address: str
    island_id: str
    shovel_token_id: int

class ChatRequest(BaseModel):
    message: str
    user_address: str
    island_id: str

# FastAPI App
app = FastAPI()

# Security
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME)

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header != os.getenv("TEE_API_KEY"):
        raise HTTPException(status_code=403, detail="Invalid API key")
    return api_key_header

# Initialize TEE Agent
tee_agent = TEEAIAgent(
    claude_api_key=os.getenv("CLAUDE_API_KEY"),
    contract_address=os.getenv("CONTRACT_ADDRESS"),
    rpc_url=os.getenv("RPC_URL"),
    tee_private_key=os.getenv("TEE_PRIVATE_KEY")
)

@app.post("/dig", dependencies=[Depends(get_api_key)])
async def handle_dig(request: DigRequest):
    """Handle dig requests from the backend"""
    result = await tee_agent.verify_dig(
        x=request.x,
        y=request.y,
        user_address=request.user_address,
        island_id=request.island_id,
        shovel_token_id=request.shovel_token_id
    )
    return result

@app.post("/chat", dependencies=[Depends(get_api_key)])
async def handle_chat(request: ChatRequest):
    """Handle chat requests from the backend"""
    response = await tee_agent.handle_chat(
        user_message=request.message,
        island_id=request.island_id,
        user_address=request.user_address
    )
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
