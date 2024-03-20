import React from 'react';
import * as Tone from 'tone';

const MusicPlayer = () => {
//   useEffect(() => {
//     const backgroundSynth = new Tone.Synth().toDestination();
//     const loop = new Tone.Loop(time => {
//       backgroundSynth.triggerAttackRelease("C4", "8n", time);
//     }, "4n");

//     // Cleanup function
//     return () => {
//       loop.stop();
//       Tone.Transport.stop();
//     };
//   }, []); // Empty dependency array means this runs on mount only

//   const startMusic = async () => {
//     await Tone.start();
//     console.log('Playback started successfully');
//     Tone.Transport.start();
//   };

    const testSynth = new Tone.Synth().toDestination();

    const notes = ['C3', 'G3', 'C4', 'G3'];

    Tone.Transport.scheduleRepeat(time => {
    repeat(time);
    },'8n');

    let repeaterIndex = 0;

    function repeat(time) {
    let note = notes[repeaterIndex % notes.length];
    testSynth.triggerAttackRelease(note, '8n', time);
    repeaterIndex++
    }
    const startMusic = () => {
        Tone.Transport.start();
    setTimeout(() => {
    Tone.Transport.stop();
    }, 3000)
    }

    

  return (
    <button onClick={startMusic}>Play Background Music</button>
  );
};

export default MusicPlayer;
