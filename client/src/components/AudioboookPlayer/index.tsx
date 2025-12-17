import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "../Button/ActionButton"
import { Slider } from "../Slider"
import { PauseIcon } from "lucide-react"

export default function AudiobookPlayer({
  frontImage,
  title,
  authorName,
  audioUrl,
}: any) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Validate audioUrl first
    if (!audioUrl) {
      setError('premium_required')
      setIsLoading(false)
      return
    }

    console.log('AudiobookPlayer received audioUrl:', audioUrl)

    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.ontimeupdate = () =>
        setCurrentTime(audioRef.current?.currentTime || 0)
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0)
        setIsLoading(false)
        setError(null)
        console.log('Audio metadata loaded:', {
          duration: audioRef.current?.duration,
          src: audioRef.current?.src
        })
      }
      audioRef.current.onerror = (e) => {
        const errorCode = audioRef.current?.error?.code
        const errorMessage = audioRef.current?.error?.message
        let userFriendlyMessage = 'Error desconocido'
        
        switch (errorCode) {
          case 1: // MEDIA_ERR_ABORTED
            userFriendlyMessage = 'Carga de audio cancelada'
            break
          case 2: // MEDIA_ERR_NETWORK
            userFriendlyMessage = 'Error de red al cargar audio'
            break
          case 3: // MEDIA_ERR_DECODE
            userFriendlyMessage = 'Error al decodificar audio - formato no soportado'
            break
          case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
            userFriendlyMessage = 'Formato de audio no soportado'
            break
          default:
            userFriendlyMessage = errorMessage || 'Error al cargar audio'
        }
        
        console.error('Audio error:', {
          event: e,
          error: audioRef.current?.error,
          code: errorCode,
          message: errorMessage,
          url: audioUrl
        })
        setError(`${userFriendlyMessage} (Código: ${errorCode})`)
        setIsLoading(false)
      }
      audioRef.current.oncanplay = () => {
        console.log('Audio can play')
        setIsLoading(false)
      }
      audioRef.current.onloadstart = () => {
        console.log('Audio load started for:', audioUrl)
        setIsLoading(true)
        setError(null)
      }
      audioRef.current.oncanplaythrough = () => {
        console.log('Audio can play through')
        setIsLoading(false)
      }
      audioRef.current.onprogress = () => {
        console.log('Audio loading progress')
      }
    }
  }, [volume, audioUrl])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10,
      )
    }
  }

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 10,
      )
    }
  }

  const handleVolumeChange = (value: number) => {
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setVolume(value)
    }
  }

  const retryAudioLoad = () => {
    if (audioRef.current) {
      setError(null)
      setIsLoading(true)
      audioRef.current.load() // Reload the audio element
    }
  }

  const handleProgressChange = (value: number) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = (value / 100) * duration
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) {
      return "0:00"
    }
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="bg-ebook-linear rounded-lg shadow-md p-4 sm:p-6">
      <audio 
        ref={audioRef} 
        src={audioUrl}
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source src={audioUrl} type="audio/mpeg" />
        <source src={audioUrl} type="audio/mp3" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      
      {/* Loading State */}
      {isLoading && !error && (
        <div className="text-center mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-blue-700 font-medium">Cargando audiobook...</p>
          </div>
          <p className="text-sm text-blue-600 mt-2">Preparando la experiencia de audio</p>
        </div>
      )}
      
      {error && error === 'premium_required' && (
        <div className="text-center mb-4 p-4">
          <p className="text-gray-500">Contenido no disponible</p>
        </div>
      )}

      {error && error !== 'premium_required' && (
        <div className="text-center mb-4 p-4 bg-red-100 rounded-lg">
          <p className="text-red-700">{error}</p>
          <p className="text-sm text-red-600 mt-1">URL: {audioUrl}</p>
          <div className="flex gap-2 mt-2 justify-center">
            <Button 
              size="sm" 
              variant="secondary" 
              onClick={() => window.open(audioUrl, '_blank')}
            >
              Probar URL en nueva pestaña
            </Button>
            <Button 
              size="sm" 
              variant="secondary" 
              onClick={retryAudioLoad}
            >
              Reintentar carga
            </Button>
          </div>
        </div>
      )}
      
      <div className="flex md:flex-row flex-col items-center justify-between mb-4">
        <div className="flex md:flex-row flex-col items-center gap-2">
          <Image
            src={frontImage}
            alt="Album Cover"
            width={100}
            height={100}
            className="rounded-md"
          />
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-neutral/90 text-sm">{authorName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" disabled={!!error}>
            <i className="bx bxs-volume-full bx-sm"></i>
          </Button>
          <Slider
            defaultValue={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleVolumeChange(value[0])}
            disabled={!!error}
            className="cursor-pointer w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300  [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-4">
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleRewind}
            disabled={isLoading || !!error || duration === 0}
          >
            <i className="bx bx-rewind bx-lg"></i>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={togglePlayPause}
            disabled={isLoading || !!error || duration === 0}
          >
            {isPlaying ? (
              <i className="bx bx-pause bx-lg"></i>
            ) : (
              <i className="bx bx-play bx-lg"></i>
            )}
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleForward}
            disabled={isLoading || !!error || duration === 0}
          >
            <i className="bx bx-fast-forward bx-lg"></i>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral">{formatTime(currentTime)}</div>
        <Slider
          defaultValue={[0]}
          min={0}
          max={100}
          step={0.1}
          value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
          onValueChange={(value) => handleProgressChange(value[0])}
          disabled={!!error}
          className="cursor-pointer flex-1 mx-4 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
        />
        <div className="text-sm text-neutral">{formatTime(duration)}</div>
      </div>
    </div>
  )
}
