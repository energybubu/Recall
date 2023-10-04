
import { Link } from 'react-router-dom';
import { useState } from 'react'
const DatasetPage = () => {
    const [LEDDialogues, setLEDDialogues] = useState([
        {
            "id": 215,
            "dialogue": "S1 : Jenny , do you want to go to see a movie ?\nS2 : What 's on tonight ?\nS1 : I want to see ' Click . '\nS2 : Who is in this movie ?\nS1 : I do n't know . My friend told me it was a touching movie .\n"
        },
        {
            "id": 216,
            "dialogue": "S1 : Bill , I must tell you the truth . You failed the English exam again .\nS2 : Ah ? Really ? That stinks !\nS1 : Haha . April Fool 's ! Did you forget what day it is today ?\nS2 : Wow , you were pulling my leg all along . I was really fooled .\nS1 : Alright , now let 's be serious . Actually , you get high marks in the exam .\n"
        },
    ])
    const [chatGPTDialogues, setChatGPTDialogues] = useState([
        {
            "topic_id": 1,
            "dialogue": "S1: Do you want to play badminton tomorrow? I have a competition next Saturday. I need to practice for that.\nS2: Wow! That's nice. Tomorrow will be ok. How about at 5 p.m.\nS1: Ok! See you on the court!\nS2: Nice!",
            "rephrased_dialogue": "S1: Would you like to play badminton tomorrow? I have a competition next Saturday.\nS2: Wow! That's great. Tomorrow will be better. How about at 5 p.m.?\nS1: Certainly! I look forward to seeing you on the court.\nS2: Me too!",
            "dialogue_id": 1004
        },
        {
            "topic_id": 5,
            "dialogue": "S1: I've been practicing my serves in ping-pong.\nS2: Serving is an important skill. How's your progress?\nS1: It's getting better. I'm working on different types of serves to keep my opponents guessing.\nS2: That's smart. Variety in your serves can give you an advantage.",
            "rephrased_dialogue": "S1: I've been honing my serve skills in ping-pong.\nS2: Are you making progress in the area of serving?\nS1: It is improving. I am focusing on various types of serves to keep my opponents uncertain.\nS2: Adding diversity to your serves can give you a competitive edge.",
            "dialogue_id": 1025
        },
        {
            "topic_id": 5,
            "dialogue": "S1: I participated in a ping-pong tournament and made it to the semifinals.\nS2: Congratulations! That's impressive. How were your matches?\nS1: They were intense. I had to adapt to different playing styles, but I managed to win some tough matches.\nS2: Well done! You're making great strides in ping-pong.",
            "rephrased_dialogue": "S1: I attended a ping-pong tournament and advanced to the semifinals.\nS2: Thank you! Your performance was quite impressive. How did your matches go?\nS1: I had to adapt to different aggressive playing styles, but I managed to win some tough matches.\nS2: Congratulations! You're progressing nicely in table tennis.",
            "dialogue_id": 1026
        },
        {
            "topic_id": 5,
            "dialogue": "S1: I won the ping-pong tournament!\nS2: That's amazing! How did the final match go?\nS1: It was a close match, but I stayed focused and played my best. I'm so thrilled to have come out as the champion.\nS2: You're a ping-pong star now! Keep up the great work.",
            "rephrased_dialogue": "S1: I am pleased to announce that I have emerged victorious in the ping-pong tournament!\nS2: That's incredible! How did the final match turn out?\nS1: I was in a tight contest, but I maintained my focus and played my best. I'm overjoyed to have emerged as the winner.\nS2: You're a ping-pong champion! Keep up the excellent performance.",
            "dialogue_id": 1027
        },
    ])
    const [recallExamples, setRecallExamples] = useState([
        {
            related_dialogues: [216],
            new_dialogue: "S3: Do you know Bill's English exam score?\nS1:",
            reply: "Yes, he got high marks in the exam.",
            crucial_reply: "got high marks"
        },
        {
            "related_dialogues": [1025, 1026, 1027],
            "new_dialogue":"S3: How did you prepare for the ping-pong tournament and manage to win during the tournament?\nS1:",
            "reply":"I've been honing my serve skills in ping-pong before the tournament. And during the semi-final and the final, I tried to adapt to different playing styles, stayed focus, and played my best.",
            "crucial_reply":"serve skill semi final adapt style focus"
        }
    ])

    const [conflictExamples, setconflictExamples] = useState([
        {
            "related_dialogues": [
                215
            ],
            "new_dialogue": "S1: Have you watched the TV series 'Click'?",
            "correct_sentence": "S1: Have you watched the movie 'Click'?",
            "correctness": 0
        },
        {
            "dialogues_with_clue": [
                1004,
                1026,
                1027
            ],
            "new_dialogue": "S1: Badminton is the only sport that I can play.",
            "correct_sentence": "S1: I can play both badminton and ping-pong.",
            "points": 1,
            "correctness": 0
        },
    ])

    const Indent = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
    const PrettyPrintJson = ({ data }) => (
        <div>
          {data.map((item, index) => (
            <pre key={index} style={{overflowX:'auto'}}>
              {JSON.stringify(item, null, 2)}
            </pre>
          ))}
        </div>
      );
      
    return (
        <div style={{width:'150vh'}}>
            {/* <div style={{height:'10vh'}}></div> */}
            <h1>Dialogues Retrieved from LED Dataset</h1>
            <ul>
            <li>id = 1 ~ 1002</li>
            </ul>
            <hr/>
            <h2>Examples</h2>
            <PrettyPrintJson data={LEDDialogues}/>
            <h1>Dialouges Generated with ChatGPT + Falcon</h1>
            <ul>
            <li>id = 1003 ~ 1037</li>
            </ul>
            <hr/>
            <h2>Examples</h2>
            <PrettyPrintJson data={chatGPTDialogues}/>
            <h1>Event Recaller</h1>
            <ul>
            <li>The first instance shows that there is only one single related dialogues, there are total 51 instances in this format</li>
            <li>The second instance shows that there are more than two related dialogues, there are total 20 instances in this format</li>
            </ul>
            <hr/>
            <h2>Examples</h2>
            <PrettyPrintJson data={recallExamples}/>
            <h1>Conflict Corrector</h1>
            <ul>
                <li>The first instance shows that there is only one single related dialogues, there are total 50 instances in this format</li>
                <li>The second instance shows that there are more than two related dialogues, there are total 20 instances in this format</li>
                <li>When we conducted the experiment of Conflict Detection, we needed half instances with conflicts and the other half without conflicts. Therefore, we built the other half which is without conflicts by exchange the "new_dialogue" and the "correct_sentence", and set the "correctness" to 1.</li>
            </ul>
            <hr/>
            <h2>Examples</h2>
            <PrettyPrintJson data={conflictExamples}/>
            <div style={{height:'10vh'}}></div>
        </div>
    );
}
export default DatasetPage