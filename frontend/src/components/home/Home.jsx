import { useCallback, useRef, useState } from "react";
import { Button } from "../Button.jsx";
import { Container } from "../container/Container.jsx";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";

export function Home() {
  const [preview, setPreview] = useState(null);
  const webCamRef = useRef(null);
  const [isCapturing, SetIsCapturing] = useState(false);
  const [image, setImage] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const onDrop = useCallback((file) => {
    const image = file[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
  }, []);

  const submitImage = () => {
    if (isCaptured) {
      const imageBlob = dataURLtoBlob(image);
      const formData = new FormData();
      formData.append("image", imageBlob, "photo.jpeg");
      setImage(formData);
      setIsCaptured(false);
    }

    // To be send to backend
  };

  const dataURLtoBlob = useCallback((dataURL) => {
    const [header, data] = dataURL.split(",");
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mime });
  }, []);

  const Capture = useCallback(() => {
    const image = webCamRef?.current?.getScreenshot();
    setIsCaptured(true);
    setPreview(image);
    setImage(image);
    SetIsCapturing(false);
  }, []);

  const { getRootProps, getInputProps, isDropActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });
  return (
    <Container className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 blur-2xl rounded-full opacity-50"></div>
          <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            AI Image Analysis
          </h1>
        </div>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
          Analyze your images with AI in seconds
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto mb-16">
        {preview ? (
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50"></div>
            
            {/* Preview container */}
            <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,255,0.15)]">
              <div className="mb-6">
                <img 
                  src={preview} 
                  alt="Preview of Uploaded Image" 
                  className="w-full h-auto rounded-xl border border-cyan-500/20 shadow-lg"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setPreview(null);
                    setIsCaptured(false);
                    setImage(null);
                  }}
                  className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                    text-gray-300 hover:text-red-400 border border-transparent hover:border-red-500/50 hover:bg-linear-to-r hover:from-red-500/10 hover:to-red-500/10
                    before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-red-500/0 before:via-red-500/0 before:to-red-500/0 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-red-500/20 after:via-red-500/20 after:to-red-500/20 
                    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                    hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </span>
                </Button>
                <Button 
                  type="submit" 
                  onClick={submitImage}
                  className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                    text-gray-100 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 
                    hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30
                    before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                    hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Go for Caption Generation
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ) : isCapturing ? (
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50"></div>
            
            {/* Webcam container */}
            <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,255,255,0.15)]">
              <div className="mb-6 flex justify-center">
                <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-lg">
                  <Webcam
                    audio={false}
                    ref={webCamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full max-w-md"
                  />
                  <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-xl pointer-events-none"></div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => SetIsCapturing(false)}
                  className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                    text-gray-300 hover:text-red-400 border border-transparent hover:border-red-500/50 hover:bg-linear-to-r hover:from-red-500/10 hover:to-red-500/10
                    before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-red-500/0 before:via-red-500/0 before:to-red-500/0 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-red-500/20 after:via-red-500/20 after:to-red-500/20 
                    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                    hover:shadow-[0_0_25px_rgba(255,0,0,0.3)] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </span>
                </Button>
                <Button 
                  onClick={Capture}
                  className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                    text-gray-100 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 
                    hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30
                    before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                    hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Capture
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative" {...getRootProps()}>
            {/* Background glow */}
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50"></div>
            
            {/* Dropzone container */}
            <div className={`relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border rounded-2xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,255,255,0.15)] transition-all duration-300 cursor-pointer
              ${isDropActive 
                ? 'border-cyan-400/70 shadow-[0_0_60px_rgba(0,255,255,0.3)] scale-[1.02]' 
                : 'border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-[0_0_60px_rgba(0,255,255,0.25)]'
              }`}>
              <input {...getInputProps()} className="hidden" />
              
              <div className="text-center">
                {/* Upload Icon */}
                <div className="mb-6 flex justify-center">
                  <div className={`relative p-6 rounded-2xl border transition-all duration-300
                    ${isDropActive 
                      ? 'bg-linear-to-br from-cyan-500/20 to-purple-500/20 border-cyan-400/50 shadow-[0_0_30px_rgba(0,255,255,0.3)]' 
                      : 'bg-slate-800/40 border-cyan-500/30'
                    }`}>
                    <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300
                  ${isDropActive 
                    ? 'bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent' 
                    : 'text-gray-300'
                  }`}>
                  {isDropActive ? 'Drop Here' : 'Drag Image or Click to Browse'}
                </h3>
                <p className="text-gray-400 text-sm mb-8">
                  Support for JPG, PNG, GIF, and more
                </p>
                
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    SetIsCapturing(true);
                  }}
                  className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                    text-gray-100 bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 
                    hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-linear-to-r hover:from-cyan-500/30 hover:to-purple-500/30
                    before:absolute before:inset-0 before:rounded-lg before:bg-linear-to-r before:from-cyan-500/0 before:via-purple-500/0 before:to-cyan-500/0 
                    before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                    after:absolute after:inset-0 after:rounded-lg after:bg-linear-to-r after:from-cyan-500/20 after:via-purple-500/20 after:to-cyan-500/20 
                    after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-300 after:blur-sm
                    hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Go To Capture
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature 1: Lightning Fast */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 hover:border-cyan-400/50 hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 text-center">
                Lightning Fast
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Get instant AI-powered analysis of your images
              </p>
            </div>
          </div>

          {/* Feature 2: Analysis History */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 hover:border-cyan-400/50 hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 text-center">
                Analysis History
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Keep track of all your analyzed images
              </p>
            </div>
          </div>

          {/* Feature 3: Secure & Private */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative backdrop-blur-xl bg-linear-to-br from-slate-900/90 via-purple-900/70 to-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] transition-all duration-300 hover:border-cyan-400/50 hover:scale-105">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30">
                  <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 text-center">
                Secure & Private
              </h3>
              <p className="text-gray-400 text-sm text-center">
                Your images are processed securely and privately
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
