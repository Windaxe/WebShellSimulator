import { useState, useRef } from 'react';
import React from 'react';

function Terminal() {


    const terminalRef = useRef();

    
    const [commands, setCommands] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [actualdir, setActualdir] = useState([]);
    const [lastDir, setLastDir] = useState("");

    const [dir, setDir] = useState(["Documents","DoNotClick", "Text"]);     
    let i = 0;
    let currentdir = [];
    let commandArgument = "";


    function DirEmplacement(){
        let Iaraay;

        const Lastitem = lastDir.length - 1;

    switch (lastDir[Lastitem]) {
        case 'documents':
         Iaraay = 1;
        break;

        case 'donotclick':
         Iaraay = 2;
        break;

        case 'text':
         Iaraay = 3;
        break;
        default:
            Iaraay = 0;
            break;
    }

    return Iaraay;
    }


   function handlecommands(event) {
    
    
    if(event.key === "Enter") {
        const Fulllcommand = event.target.value.toString().toLowerCase();
        let command = Fulllcommand.split(" ")[0];
        
        
       

        

        if(command === "help") {
            const answer = (
            <>
            <div className='help'>
             <ul><li>List of command : </li>
                    <li>HELP&nbsp;&nbsp;&nbsp;&nbsp;Give you a full list of command</li>
                    <li>LS&nbsp;&nbsp;&nbsp;&nbsp;Show folder</li>
                    <li>CD&nbsp;&nbsp;&nbsp;&nbsp;Change directory</li>
                    <li>ERASE&nbsp;&nbsp;clear terminal and go back to original folder</li>
                    </ul>
            </div>
            </>);
           
            setCommands(prevCommands => [...prevCommands, command]);
            setAnswers(prevAnswers => [...prevAnswers, answer]);

        } 

        else if (command === "ls") {
           


            const dirPlace = dir[DirEmplacement()];

        
          
            const answer = <><ul>{dirPlace}</ul></>;
            setCommands(prevCommands => [...prevCommands, command]);
            setAnswers(prevAnswers => [...prevAnswers, answer]);

        }
        else if (command === "cd") {
            const commandarguments = Fulllcommand.split(" ");
            let newdir = "";
            let changedir = "";
        
            if (commandarguments.length > 1) {
                const folder = commandarguments[1].trim().toLowerCase();
                const dirPlace = dir[DirEmplacement()];
                
                if (dirPlace.toString().toLocaleLowerCase() == folder) {
                    if (!lastDir.includes(folder)) {
                        const lastDir = folder;
                        newdir = folder;
                        changedir = `/${folder}`;
                        setLastDir(prevFolder => [...prevFolder, lastDir]);
                      
                        
                    } else {
                        newdir = "You are already in this folder ! ";
                    }
                } else {
                    newdir = `Not a valid folder: ${folder}`;
                }
            } else {
                newdir = "Please provide a folder name.";
            }
           

            {/*dir.toString().toLowerCase().includes(folder)*/}

            const answer = newdir;
            const actualdir = changedir; // Nouvelle valeur de actualdir, pas un tableau
        
            setCommands(prevCommands => [...prevCommands, command]);
            setAnswers(prevAnswers => [...prevAnswers, answer]);
            setActualdir(prevdir => [...prevdir, actualdir]); // Mise à jour directe de actualdir avec la nouvelle valeur
        }
        

        else if(command === "erase") {
           
            

            setCommands([]);
            setAnswers([]);
            setActualdir([]);
            setLastDir([]);
            setDir(["Documents","DoNotClick", "Text"]);

        }

        else {
            const answer = `Unknown commands !`;
            setCommands(prevCommands => [...prevCommands, command]);
            setAnswers(prevAnswers => [...prevAnswers, answer]);
        }
        event.target.value = ""; // Clear the input field
    }
}

return (
    <>
        <div className="terminal-item">
            <p>Microterminal Doors XD [version 1.0.2600] <br />
            (C) Copyright 1998-2024 Microterminal Corps.</p>
            <p>Type help for a list of commands</p>
        </div>
        <div className="user-container">
            {/* Render commands and answers */}
            {commands.map((command, index) => (
                <>
                <div key={`command-${index}`} className="user-item">
                 <p>C:/Documents/Admin{actualdir}&gt;{command}</p>
                 
             </div>

                <div key={`answer-${index}`}  className="user-item terminal-answer">
                    <p>{answers[index]}</p>
                    
                </div>
                
                
                
                </>
                


            ))}
            {/* Input field */}
            <div className="user-item">
                <p>C:/Documents/Admin{actualdir}&gt; </p>
                <input onKeyDown={handlecommands} placeholder="Enter command..." />
            </div>
        </div>
    </>
);
}

export default Terminal;