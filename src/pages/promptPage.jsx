
import { Link } from 'react-router-dom';

const Firstpage = () => {
    const Indent = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    return (
        <div style={{height:'90vh'}}>
            <Link to='/'>Go Back to Home Page</Link>
            <h1>Event Recaller</h1>
            
            <h3>System Message:</h3>
            <p><Indent/>Based on the previous dialogues, please concisely provide the details.</p>
            <br/>
            <h3>User Message</h3>
            <p><Indent/>[[ Previous Dialogues ]]</p>
            <p><Indent/>1</p>
            <p><Indent/>Dialogues 1</p>
            <p><Indent/>2</p>
            <p><Indent/>Dialogues 2</p>
            <p><Indent/>3</p>
            <p><Indent/>Dialogues 3</p>
            <p><Indent/>.</p>
            <p><Indent/>.</p>
            <p><Indent/>.</p>
            <br />
            <p><Indent/>[[ New Dialogue ]]</p>
            <p><Indent/>New Dialogue</p>
            <br/>
            <p><Indent/>[[ Instruction ]]</p>
            <p><Indent/>Finish what S1 should say, and provide details only based on previous dialogues in short.</p>
            <br/><br/>
            
            <h1>Conflict Corrector --- Detection</h1>
            
            <h3>System Message:</h3>
            <p><Indent/>Detect conflicts between Previous Dialogues and New Dialogue, and then output 'Yes' or 'No'.</p>
            <br/>
            <h3>User Message</h3>
            <p><Indent/>[[ Previous Dialogues ]]</p>
            <p><Indent/>1</p>
            <p><Indent/>Dialogues 1</p>
            <p><Indent/>2</p>
            <p><Indent/>Dialogues 2</p>
            <p><Indent/>3</p>
            <p><Indent/>Dialogues 3</p>
            <p><Indent/>.</p>
            <p><Indent/>.</p>
            <p><Indent/>.</p>
            <br />
            <p><Indent/>[[ New Dialogue ]]</p>
            <p><Indent/>New Dialogue</p>
            <br/>
            <p><Indent/>[[ Instruction ]]</p>
            <p><Indent/>Does New dialogue conflict with Previous dialogues?</p>
            <br/><br/>


            <h1>Conflict Corrector --- Correction</h1>
            <p><Indent/>The prompt in this component uses a chain of thought.</p><br/>

            <h3>System Message:</h3>
            <p><Indent/>Precisely determine conflicts between [[ New Dialogue ]] and [[ Previous Dialogues ]].</p>
            <br/>
            <br/>
            <h3>User Message </h3>
            <p><Indent/>[[ Previous Dialogues ]]</p>
            <p><Indent/>1</p>
            <p><Indent/>Dialogues 1</p>
            <p><Indent/>2</p>
            <p><Indent/>Dialogues 2</p>
            <p><Indent/>3</p>
            <p><Indent/>Dialogues 3</p>
            <p><Indent/>.</p>
            <p><Indent/>.</p>
            <p><Indent/>.</p>
            <br />
            <p><Indent/>[[ New Dialogue ]]</p>
            <p><Indent/>New Dialogue</p>
            <br/>
            <p><Indent/>[[ Instruction ]]</p>
            <p><Indent/>Concisely point out the conflict between New Dialogue and Previous Dialogues precisely.</p>
            <h3>Assistant Message</h3>
            <p><Indent/>The answer from the assitant</p>
            <h3>User Message </h3>
            <p><Indent/>Rewrite the last utterance in New Dialogue only based on Previous Dialogues to resolve Conflicts and provide details as more as you can.</p>
            <br/><br/><br/><br/>
        </div>
    );
}
export default Firstpage