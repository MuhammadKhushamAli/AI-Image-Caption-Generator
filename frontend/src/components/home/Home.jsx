import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../Button.jsx";
import { Container } from "../container/Container.jsx";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import { axiosInstance } from "../../axios/axios.js";
import { useNavigate } from "react-router";
import { Loading } from "../Loading.jsx";
import { useSelector } from "react-redux";
import { Error } from "../Error.jsx";

export function Home() {
  const [preview, setPreview] = useState(null);
  const webCamRef = useRef(null);
  const [isCapturing, SetIsCapturing] = useState(false);
  const [image, setImage] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isMainLoading, setMainLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loginStatus = useSelector((state) => state?.auth?.loginStatus);

  const onDrop = useCallback((file) => {
    const image = file[0];
    setImage(image);
    setPreview(URL.createObjectURL(image));
    setIsCaptured(false);
  }, []);

  const submitImage = async () => {
    setIsLoading(true);
    let imageBlob = image;
    if (isCaptured) {
      imageBlob = dataURLtoBlob(image);
      setIsCaptured(false);
    }
    const formData = new FormData();
    formData.append("image", imageBlob, "photo.jpeg");

    try {
      const response = await axiosInstance.post(
        loginStatus ? "/api/v1/chat/add-chat" : "/api/v1/chat/add-chat-guest",
        formData
      );
      console.log(response);
      if (response.status == 200) {
        setError(response.message);
        navigate(`/chat/${response?.data?._id}`);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
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
    const imageCaptured = webCamRef?.current?.getScreenshot();
    setIsCaptured(true);
    setPreview(imageCaptured);
    setImage(imageCaptured);
  }, []);

  const { getRootProps, getInputProps, isDropActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  useEffect(() => setMainLoading(false), []);
  return (
    <Container className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      {error && <Error error={error} />}
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 relative z-10">
            <div className="relative inline-block mb-4 group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40 blur-2xl rounded-full opacity-50 animate-pulse group-hover:opacity-75 transition-opacity duration-500"></div>
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-r from-cyan-200 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                AI Image Analysis
              </h1>
            </div>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto tracking-wide border-b border-slate-800/50 pb-8">
              Analyze your images with AI in seconds
            </p>
          </div>
          {/* Main Content Area */}
          <div className="max-w-4xl mx-auto mb-16 relative z-10">
            {preview ? (
              <div className="relative group">
                {/* Background glow */}
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl rounded-3xl opacity-50 transition-opacity duration-500"></div>

                <div className="relative backdrop-blur-2xl bg-slate-900/60 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(8,145,178,0.15)] ring-1 ring-white/5">
                  <div className="mb-6 overflow-hidden rounded-xl relative">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-400/10 to-transparent w-full h-[20%] animate-[scan_3s_ease-in-out_infinite] pointer-events-none z-20"></div>

                    <img
                      src={preview}
                      alt="Preview of Uploaded Image"
                      className="w-full h-auto rounded-xl border border-cyan-500/20 shadow-2xl"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setPreview(null);
                        setIsCaptured(false);
                        setImage(null);
                      }}
                      className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group overflow-hidden
                text-slate-300 hover:text-white border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10
                active:scale-95 shadow-lg hover:shadow-red-900/20"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </span>
                    </Button>

                    <Button
                      type="submit"
                      onClick={submitImage}
                      className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group overflow-hidden
                text-white bg-linear-to-r from-cyan-600/20 to-purple-600/20 border border-cyan-500/50 
                hover:text-cyan-100 hover:border-cyan-400 hover:bg-cyan-500/20
                hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] active:scale-95"
                    >
                      <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 animate-bounce"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
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
                <div className="relative backdrop-blur-2xl bg-slate-900/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(8,145,178,0.15)]">
                  <div className="mb-6 flex justify-center">
                    <div className="relative rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-900/20">
                      <Webcam
                        audio={false}
                        ref={webCamRef}
                        screenshotFormat="image/jpeg"
                        className="w-full max-w-md"
                      />
                      <div className="absolute inset-0 border-[3px] border-cyan-400/30 rounded-xl pointer-events-none">
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => SetIsCapturing(false)}
                      className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                text-slate-300 hover:text-white border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Cancel
                      </span>
                    </Button>
                    <Button
                      onClick={Capture}
                      className="relative px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 group
                text-white bg-cyan-600/20 border border-cyan-500/50 hover:bg-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Capture
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group" {...getRootProps()}>
                {/* Background glow */}
                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-3xl rounded-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Dropzone container */}
                <div
                  className={`relative backdrop-blur-xl bg-slate-900/80 border rounded-3xl p-8 sm:p-12 shadow-2xl transition-all duration-500 ease-out cursor-pointer overflow-hidden
          ${
            isDropActive
              ? "border-cyan-400 shadow-[0_0_80px_rgba(34,211,238,0.2)] scale-[1.02] bg-slate-800/90"
              : "border-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_60px_rgba(34,211,238,0.1)]"
          }`}
                >
                  <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-cyan-500/10 to-transparent rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-purple-500/10 to-transparent rounded-br-3xl pointer-events-none" />

                  <input {...getInputProps()} className="hidden" />

                  <div className="text-center relative z-10">
                    <div className="mb-8 flex justify-center">
                      <div
                        className={`relative p-8 rounded-full border-2 transition-all duration-500
                ${
                  isDropActive
                    ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)] scale-110"
                    : "bg-slate-800/50 border-slate-700 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                }`}
                      >
                        <div className="animate-[float_3s_ease-in-out_infinite]">
                          <svg
                            className={`w-16 h-16 transition-colors duration-300 ${
                              isDropActive
                                ? "text-cyan-300"
                                : "text-slate-400 group-hover:text-cyan-400"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <h3
                      className={`text-3xl font-bold mb-3 transition-all duration-300
              ${
                isDropActive
                  ? "bg-linear-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent scale-105"
                  : "text-slate-200 group-hover:text-white"
              }`}
                    >
                      {isDropActive ? "Drop Image Now" : "Drag & Drop or Click"}
                    </h3>
                    <p className="text-slate-400 text-sm mb-10 tracking-wide">
                      Supports JPG, PNG, GIF • Max 10MB
                    </p>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        SetIsCapturing(true);
                      }}
                      className="relative px-8 py-3.5 text-base font-semibold rounded-full transition-all duration-300 group overflow-hidden
                text-white bg-slate-800 border border-slate-600 
                hover:border-cyan-400/50 hover:text-cyan-50 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]
                active:scale-95"
                    >
                      <span className="absolute inset-0 bg-linear-to-r from-cyan-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Open Camera
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Features Section - Glass Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Feature 1: Lightning Fast */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-b from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="relative h-full backdrop-blur-md bg-slate-900/50 border border-white/5 rounded-2xl p-8 transition-all duration-300 group-hover:border-cyan-500/30 group-hover:-translate-y-2">
                  <div className="mb-6 inline-block p-3 rounded-lg bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                    <svg
                      className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-300 transition-colors">
                    Lightning Fast
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Powered by advanced neural networks to deliver instant AI
                    analysis with zero latency.
                  </p>
                </div>
              </div>

              {/* Feature 2: Analysis History */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-b from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="relative h-full backdrop-blur-md bg-slate-900/50 border border-white/5 rounded-2xl p-8 transition-all duration-300 group-hover:border-purple-500/30 group-hover:-translate-y-2">
                  <div className="mb-6 inline-block p-3 rounded-lg bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 group-hover:border-purple-500/50 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                    <svg
                      className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-purple-300 transition-colors">
                    Smart History
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Automatically archives your sessions, allowing you to
                    revisit previous analyses anytime.
                  </p>
                </div>
              </div>

              {/* Feature 3: Secure & Private */}
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-b from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl"></div>
                <div className="relative h-full backdrop-blur-md bg-slate-900/50 border border-white/5 rounded-2xl p-8 transition-all duration-300 group-hover:border-emerald-500/30 group-hover:-translate-y-2">
                  <div
                    className="mb-6 inline-block p-3 rounded-lg bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 group-hover:border-emerald-500/5Opening a file:
/Game/24"
                  >
                    <svg
                      className="w-8 h-8 text-emerald-400 group-hover:text-emerald-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-emerald-300 transition-colors">
                    Secure & Private
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Enterprise-grade encryption ensures your visual data remains
                    exclusively yours.
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}

      {/* Add custom keyframes for the scanner animation and float in your global CSS or Tailwind config */}
      <style>{`
    @keyframes scan {
      0% { top: -20%; opacity: 0; }
      50% { opacity: 1; }
      100% { top: 120%; opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}</style>
    </Container>
  );
}
