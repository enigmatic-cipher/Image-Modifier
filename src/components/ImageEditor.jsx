import { Canvas, FabricImage, Textbox, Rect, Circle, Triangle } from "fabric";
import React, { useEffect, useRef } from "react";

const ImageEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    fabricCanvasRef.current = new Canvas(canvasRef.current, {
      width: "1530",
      height: window.innerHeight * 0.8,
    });

    // Load the image
    const loadImage = async () => {
      const img = await FabricImage.fromURL(imageUrl, {
        crossOrigin: "anonymous",
      });
      img.scaleToWidth(600);
      fabricCanvasRef.current.add(img);
      fabricCanvasRef.current.renderAll();
    };

    //loading image asynchronously
    loadImage();

    return () => {
      fabricCanvasRef.current.dispose();
    };
  }, [imageUrl]);

  // Function to add text
  const addText = () => {
    const text = new Textbox("Your Caption", {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: "white",
      backgroundColor: "black",
    });
    fabricCanvasRef.current.add(text);
    fabricCanvasRef.current.renderAll();
  };

  // Function to add shapes
  const addShape = (shapeType) => {
    let shape;
    if (shapeType === "rectangle") {
      shape = new Rect({
        width: 100,
        height: 100,
        fill: "blue",
        left: 100,
        top: 100,
      });
    } else if (shapeType === "circle") {
      shape = new Circle({ radius: 50, fill: "green", left: 200, top: 100 });
    } else if (shapeType === "triangle") {
      shape = new Triangle({
        width: 100,
        height: 100,
        fill: "red",
        left: 300,
        top: 100,
      });
    }
    fabricCanvasRef.current.add(shape);
    fabricCanvasRef.current.renderAll();
  };

  // Function to download the edited image
  const downloadImage = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 0.8,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited_image.png";
    link.click();
  };

  return (
    <div className="border-2 border-gray-600">
      <canvas ref={canvasRef} />
      <div className="flex justify-center items-center my-2">
        <button
          onClick={addText}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Text
        </button>
        <button
          onClick={() => addShape("rectangle")}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Add Rectangle
        </button>
        <button
          onClick={() => addShape("circle")}
          className="bg-red-500 text-white p-2 rounded mr-2"
        >
          Add Circle
        </button>
        <button
          onClick={() => addShape("triangle")}
          className="bg-yellow-500 text-white p-2 rounded mr-2"
        >
          Add Triangle
        </button>
        <button
          onClick={downloadImage}
          className="bg-purple-500 text-white p-2 rounded"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;
