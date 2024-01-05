// 'use client';

// import React, {
//     useRef,
//     useEffect,
//     useState,
//     MouseEventHandler,
//     TouchEventHandler,
// } from 'react';
// import { ColorPicker } from './color-picker';

// const getPositionFromEvent = (event: any, canvasRect: any) => {
//     const clientX = event.touches ? event.touches[0].clientX : event.clientX;
//     const clientY = event.touches ? event.touches[0].clientY : event.clientY;

//     const x = ((clientX - canvasRect.left) / canvasRect.width) * 100;
//     const y = ((clientY - canvasRect.top) / canvasRect.height) * 100;

//     return { x, y };
// };

// const hsvToRgb = (h: any, s: any, v: any) => {
//     let r, g, b, i, f, p, q, t;
//     if (s === 0) {
//         r = g = b = v; // achromatic
//     } else {
//         h /= 60;
//         i = Math.floor(h);
//         f = h - i; // factorial part of h
//         p = v * (1 - s);
//         q = v * (1 - s * f);
//         t = v * (1 - s * (1 - f));
//         switch (i % 6) {
//             case 0:
//                 r = v;
//                 g = t;
//                 b = p;
//                 break;
//             case 1:
//                 r = q;
//                 g = v;
//                 b = p;
//                 break;
//             case 2:
//                 r = p;
//                 g = v;
//                 b = t;
//                 break;
//             case 3:
//                 r = p;
//                 g = q;
//                 b = v;
//                 break;
//             case 4:
//                 r = t;
//                 g = p;
//                 b = v;
//                 break;
//             case 5:
//                 r = v;
//                 g = p;
//                 b = q;
//                 break;
//             default:
//                 throw new Error('Invalid Hue Value');
//         }
//     }
//     return {
//         r: Math.round(r * 255),
//         g: Math.round(g * 255),
//         b: Math.round(b * 255),
//     };
// };

// export const CanvaColorPicker = ({ hue = 360 }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [satCoords, setSatCoords] = useState({ x: 0, y: 0 });
//     const [isCanvasReady, setIsCanvasReady] = useState(false);

//     useEffect(() => {
//         drawSaturationValueMap();
//     }, [hue]); // Redraw when hue changes

//     const drawSaturationValueMap = () => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         const width = canvas.width;
//         const height = canvas.height;

//         for (let i = 0; i < width; i++) {
//             for (let j = 0; j < height; j++) {
//                 const saturation = i / width;
//                 const value = 1 - j / height;
//                 const { r, g, b } = hsvToRgb(hue, saturation, value);
//                 ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
//                 ctx.fillRect(i, j, 1, 1);
//             }
//         }
//         setIsCanvasReady(true); // Set to true when drawing is done
//     };

//     const handleCanvasClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
//         const canvas = canvasRef.current;
//         const ctx = canvas!.getContext('2d');
//         const rect = canvas!.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//         const imageData = ctx.getImageData(x, y, 1, 1).data;
//         const color = `rgba(${imageData[0]}, ${imageData[1]}, ${
//             imageData[2]
//         }, ${imageData[3] / 255})`;
//         console.log(color); // Log the color or use a state to save it
//     };

//     // Change the hue based on user input (not implemented here)
//     // ...

//     return (
//         <>
//             <div className='relative bg-transparent'>
//                 <canvas
//                     className='rounded-md border border-border relative'
//                     ref={canvasRef}
//                     width='300'
//                     height='150'
//                     onClick={handleCanvasClick}
//                 ></canvas>
//                 <PositionMarker
//                     coordinates={satCoords}
//                     setCoordinates={setSatCoords}
//                     canvasRef={canvasRef}
//                 />
//             </div>
//         </>
//     );
// };

// type PositionMarkerProps = {
//     coordinates?: { x: number; y: number };
//     setCoordinates?: React.Dispatch<
//         React.SetStateAction<{ x: number; y: number }>
//     >;
//     canvasRef: React.RefObject<HTMLCanvasElement>;
// };

// const PositionMarker = ({
//     coordinates = { x: 0, y: 0 },
//     setCoordinates,
//     canvasRef,
// }: PositionMarkerProps) => {
//     const markerRef = useRef(null);
//     const [isDragging, setIsDragging] = useState(false);

//     const handleDragStart: MouseEventHandler<HTMLDivElement> = (event) => {
//         event.preventDefault();
//         setIsDragging(true);
//         console.log(event.pageX, event.pageY);
//     };
//     const handleDragStartTouch: TouchEventHandler<HTMLDivElement> = (event) => {
//         event.preventDefault();
//         setIsDragging(true);
//         // console.log(event.touches[0].pageX, event.touches[0].pageY);
//     };

//     useEffect(() => {
//         const handleDrag = (event: any) => {
//             console.log('handleDrag');
//             if (isDragging) {
//                 console.log('dragging');
//                 const canvasRect = canvasRef.current!.getBoundingClientRect();
//                 const { x, y } = getPositionFromEvent(event, canvasRect);
//                 setCoordinates({ x, y });
//             }
//         };
//         const handleDragEnd = (event: any) => {
//             setIsDragging(false);
//             // console.log the color
//         };
//         canvasRef.current!.addEventListener('mousemove', handleDrag);
//         canvasRef.current!.addEventListener('mouseup', handleDragEnd);
//         return () => {
//             canvasRef.current!.removeEventListener('mousemove', handleDrag);
//             canvasRef.current!.removeEventListener('mouseup', handleDragEnd);
//         };
//     }, [canvasRef, isDragging, setCoordinates]);

//     return (
//         <div
//             ref={markerRef}
//             className='absolute w-6 h-6 rounded-full border-8 border-white cursor-move'
//             style={{
//                 left: `${coordinates.x}%`,
//                 top: `${coordinates.y}%`,
//             }}
//             onMouseDown={handleDragStart}
//             onTouchStart={handleDragStartTouch}
//         >
//             HERE!
//         </div>
//     );
// };
