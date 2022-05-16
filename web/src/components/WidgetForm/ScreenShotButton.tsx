import html2canvas from "html2canvas";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps{
    screenshot: string | null;
    onScreenshotTaken: (screenshot: string | null) => void;
}

export function ScreenShotButton({screenshot, onScreenshotTaken}: ScreenShotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

    async function handleTakeScreenShot() {
        setIsTakingScreenshot(true);
        const canvas = await html2canvas(document.querySelector('html')!);
        const base64Image = canvas.toDataURL("image/png");
        onScreenshotTaken(base64Image);
        setIsTakingScreenshot(false);
    }

    if(screenshot){
        return (
            <button
            type="button"
            className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
            onClick={() => onScreenshotTaken(null)}
            style={{backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 100,
            }}
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={handleTakeScreenShot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
        >
            { isTakingScreenshot ? <Loading/> : <Camera className="h-6 w-6 text-zinc-100" />}
        </button>
    )
}