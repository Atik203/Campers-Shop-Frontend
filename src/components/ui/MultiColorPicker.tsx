import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ScrollArea } from "./scroll-area";

export interface TColor {
  name: string;
  hex: string;
}

export interface MultiColorPickerProps {
  colors: TColor[];
  setColors: React.Dispatch<React.SetStateAction<TColor[]>>;
}

const MultiColorPicker: React.FC<MultiColorPickerProps> = ({
  colors,
  setColors,
}) => {
  const [currentColor, setCurrentColor] = useState<string>("#b32aa9");
  const [colorName, setColorName] = useState<string>("");

  const addColor = () => {
    if (colorName && currentColor) {
      setColors([...colors, { name: colorName, hex: currentColor }]);
      setColorName("");
      setCurrentColor("#b32aa9");
    }
  };

  const handleRemoveColor = (color: TColor) => {
    setColors(colors.filter((c) => c.hex !== color.hex));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          className="text-sm rounded-sm mx-auto bg-secondary-foreground text-start flex items-center justify-start"
        >
          Pick Colors
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pick a Color</DialogTitle>
          <DialogDescription>
            Select colors and add them to the list. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] w-full">
          <div className="grid gap-2 py-2">
            <HexColorPicker color={currentColor} onChange={setCurrentColor} />
            <div className="grid grid-cols-4 items-center justify-start gap-2 mt-2">
              <Label htmlFor="colorName" className="text-start">
                Name
              </Label>
              <Input
                id="colorName"
                type="text"
                placeholder="Enter color name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2 mt-2">
              <Label htmlFor="colorHex" className="text-start">
                Hex Code
              </Label>
              <Input
                id="colorHex"
                type="text"
                placeholder="Enter hex code"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="col-span-3"
              />
            </div>
            <Button onClick={addColor} className="mt-2">
              Add Color
            </Button>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Selected Colors</h3>
              <div className="mt-2 space-y-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex items-center">
                    <span
                      className="block w-8 h-8 mr-2 rounded"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    <span>
                      {color.name} ({color.hex})
                    </span>{" "}
                    <button
                      onClick={() => handleRemoveColor(color)}
                      className="ml-2 text-black font-bold "
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="mx-auto bg-secondary-foreground"
              onClick={() => setColors([])}
            >
              Clear
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MultiColorPicker;
