import './App.css'
import {Editor} from "@monaco-editor/react";
import {useRef, useState} from "react";
import * as Y from 'yjs';
import {WebrtcProvider} from "y-webrtc";
import {MonacoBinding} from "y-monaco";

function App() {
    const [userId, setUserId] = useState('');
    const editorRef = useRef(null);

    const handleEditorDidMount = (editor) => {
        editorRef.current =editor;

        const doc = new Y.Doc();  // Collection of shared objects

        // Connect to peers (WebRTC) For Demo purposes only. We would use something more robust.
        const provider = new WebrtcProvider('demo-room', doc);
        setUserId(provider.awareness.clientID.toString());


        const type = doc.getText('content');  // doc {"content": "Whatever is in the editor"}

        // Bind Yjs to editor (this is a bunch of Monaco specific stuff)
        new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness)
    };

    return (
        <>
            <div className='header'>UserId: {userId}</div>
            <Editor
                height="90vh"
                width='100vw'
                theme='vs-dark'
                onMount={handleEditorDidMount}
            />
        </>
    )
}

export default App
