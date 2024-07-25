import { h, FunctionComponent } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

interface AudioRecorderProps {
  onAudioMessage: (audioBlob: Blob) => void;
}

const AudioRecorder: FunctionComponent<AudioRecorderProps> = ({ onAudioMessage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    let recorder: MediaRecorder | null = null;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        recorder.onstop = () => {
          dispatchAudioToServer();
        };

        recorder.start();
        setMediaRecorder(recorder);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    };

    if (isRecording) {
      startRecording();
    } else {
      if (recorder) {
        recorder.stop();
        recorder = null;
        setMediaRecorder(null);
      }
    }

    return () => {
      if (recorder) {
        recorder.stream.getTracks().forEach(track => track.stop());
        recorder = null;
      }
    };
  }, [isRecording]);

  const startRecordingHandler = () => {
    audioChunksRef.current = [];
    setIsRecording(true);
  };

  const stopRecordingHandler = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const dispatchAudioToServer = () => {
    console.log("Dispatching audio to server");
    console.log(audioChunksRef.current.length);
    const blob = new Blob(audioChunksRef.current, { type: 'audio/m4a' });
    onAudioMessage(blob);
    audioChunksRef.current = [];
  };

  return (
    <div>
      {isRecording ? (
        <IconButton color="secondary" onClick={stopRecordingHandler}>
          <StopIcon />
        </IconButton>
      ) : (
        <IconButton color="primary" onClick={startRecordingHandler}>
          <MicIcon />
        </IconButton>
      )}
    </div>
  );
};

export default AudioRecorder;
