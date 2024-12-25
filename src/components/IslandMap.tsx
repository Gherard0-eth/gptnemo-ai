import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shovel } from "lucide-react";

interface IslandMapProps {
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function IslandMap({ coordinates }: IslandMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [coordinates.lng, coordinates.lat],
      zoom: 15,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Create grid overlay
    map.current.on("load", () => {
      // Add grid source
      const gridSize = 100; // 100x100 grid = 10,000 squares
      const bounds = map.current!.getBounds();
      const gridFeatures = [];

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const minLng = bounds.getWest() + (bounds.getEast() - bounds.getWest()) * (i / gridSize);
          const maxLng = bounds.getWest() + (bounds.getEast() - bounds.getWest()) * ((i + 1) / gridSize);
          const minLat = bounds.getSouth() + (bounds.getNorth() - bounds.getSouth()) * (j / gridSize);
          const maxLat = bounds.getSouth() + (bounds.getNorth() - bounds.getSouth()) * ((j + 1) / gridSize);

          gridFeatures.push({
            type: "Feature",
            properties: {
              id: `${i}-${j}`,
            },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [minLng, minLat],
                [maxLng, minLat],
                [maxLng, maxLat],
                [minLng, maxLat],
                [minLng, minLat],
              ]],
            },
          });
        }
      }

      map.current!.addSource("grid", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: gridFeatures,
        },
      });

      // Add grid layer
      map.current!.addLayer({
        id: "grid-fill",
        type: "fill",
        source: "grid",
        layout: {},
        paint: {
          "fill-color": "transparent",
          "fill-opacity": 0.1,
        },
      });

      map.current!.addLayer({
        id: "grid-lines",
        type: "line",
        source: "grid",
        layout: {},
        paint: {
          "line-color": "#ffffff",
          "line-opacity": 0.3,
          "line-width": 1,
        },
      });

      // Add click event
      map.current!.on("click", "grid-fill", (e) => {
        if (e.features && e.features[0]) {
          setSelectedSquare(e.features[0].properties.id);
        }
      });

      // Change cursor on hover
      map.current!.on("mouseenter", "grid-fill", () => {
        map.current!.getCanvas().style.cursor = "pointer";
      });

      map.current!.on("mouseleave", "grid-fill", () => {
        map.current!.getCanvas().style.cursor = "";
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [coordinates]);

  return (
    <>
      <div ref={mapContainer} className="w-full h-full" />
      <Dialog open={!!selectedSquare} onOpenChange={() => setSelectedSquare(null)}>
        <DialogContent className="bg-white/95 dark:bg-pirate-navy border-pirate-gold/20">
          <DialogHeader>
            <DialogTitle className="font-pirate text-2xl text-pirate-navy dark:text-pirate-gold">
              Eyo hunter!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground dark:text-pirate-gold/70">
              Do ya think the treasure is here? Wanna dig?
            </p>
            <Button
              className="bg-pirate-gold hover:bg-pirate-gold/90 text-pirate-navy font-pirate text-lg"
              onClick={() => console.log(`Digging at square ${selectedSquare}`)}
            >
              <Shovel className="mr-2 h-5 w-5" />
              Dig Here
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}