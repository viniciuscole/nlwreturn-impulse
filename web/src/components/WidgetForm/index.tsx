import { useState } from "react";

import BugImageURL from "../../assets/Bug.svg";
import IdeaImageURL from "../../assets/Idea.svg";
import ThoughtImageURL from "../../assets/Thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep ";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes={
    BUG:{
        title:"Problema",
        image:{
            source:BugImageURL,
            alt:'Imagem de um inseto',
        },
    },
    IDEA:{
        title:"Ideia",
        image:{
            source:IdeaImageURL,
            alt:'Imagem de uma lâmpada',
        },
    },
    OTHER:{
        title:"Outro",
        image:{
            source:ThoughtImageURL,
            alt:'Imagem de um balão de pensamento',
        },
    },
} 

export type FeedbackType = keyof typeof feedbackTypes ;

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false);

    function handleRestartFeedback() {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
            ) : (
                <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbacktypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}
            <footer className="text-xs text-neutral-400">
                Made by <a href="https://www.linkedin.com/in/vinicius-cole-de-amorim-419373211/" target={'_blank'} className="underline">me</a>
            </footer>
        </div>

    )
}