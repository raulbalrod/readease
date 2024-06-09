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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100
      audioRef.current.ontimeupdate = () =>
        setCurrentTime(audioRef.current?.currentTime || 0)
      audioRef.current.onloadedmetadata = () =>
        setDuration(audioRef.current?.duration || 0)
    }
  }, [volume])

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
    setVolume(value)
  }

  const handleProgressChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = (value / 100) * duration
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="bg-ebook-linear rounded-lg shadow-md p-4 sm:p-6">
      <audio ref={audioRef} src={audioUrl} />
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
          <Button size="icon" variant="ghost">
            <i className="bx bxs-volume-full bx-sm"></i>
          </Button>
          <Slider
            defaultValue={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => handleVolumeChange(value[0])}
            className="cursor-pointer w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300  [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" onClick={handleRewind}>
            <i className="bx bx-rewind bx-lg"></i>
          </Button>
          <Button size="icon" variant="ghost" onClick={togglePlayPause}>
            {isPlaying ? (
              <i className="bx bx-pause bx-lg"></i>
            ) : (
              <i className="bx bx-play bx-lg"></i>
            )}
          </Button>
          <Button size="icon" variant="ghost" onClick={handleForward}>
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
          value={[(currentTime / duration) * 100]}
          onValueChange={(value) => handleProgressChange(value[0])}
          className="cursor-pointer flex-1 mx-4 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
        />
        <div className="text-sm text-neutral">{formatTime(duration)}</div>
      </div>
    </div>
  )
}
