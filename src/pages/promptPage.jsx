
import { Link } from 'react-router-dom';

const Firstpage = () => {
    const Indent = () => <>&nbsp;&nbsp;&nbsp;&nbsp;</>;

    return (
        <div style={{display:'flex', flexDirection:'column' ,height:'90vh'}}>
            <Link to='/'>Go Back to Home Page</Link>
            <h2>Event Recaller</h2>
            
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
            <p><Indent/>[[ Instruction ]]</p>
            <p><Indent/>Finish what S1 should say, and provide details only based on previous dialogues in short. No explanation needed.</p>
            <br/><br/>
            
            <h2>Conflict Corrector --- Detection</h2>
            
            <h3>System Message:</h3>
            <p><Indent/>Detect conflicts between Previous Dialogues and New Dialogue, and then output 'Yes' or 'No'. S1 is always the same person. Ignore the conflicts caused by name.</p>
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
            <p><Indent/>[[ Instruction ]]</p>
            <p><Indent/>Does New dialogue conflict with Previous dialogues?</p>
            <br/><br/>


            <h2>Conflict Corrector --- Correction</h2>
            
            <h3>System Message:</h3>
            <p><Indent/>Precisely determine conflicts between [[ New Dialogue ]] and [[ Previous Dialogues ]].</p>
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
            <p><Indent/>[[ Instruction ]]</p>
            <p><Indent/>Rewrite the last utterance in New Dialogue only based on Previous Dialogues to resolve Conflicts and provide details as more as you can.</p>
            <br/><br/><br/><br/>
        </div>
    );
}
export default Firstpage