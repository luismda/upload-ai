import { useState } from 'react'
import { useCompletion } from 'ai/react'
import { Wand2 } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'

import { Header } from './components/header'
import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'
import { Separator } from './components/ui/separator'
import { PromptSelect } from './components/prompt-select'
import { VideoInputForm } from './components/video-input-form'

export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    completion,
    input,
    isLoading,
    setInput,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: `${import.meta.env.VITE_API_BASE_URL}/ai/completion`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  })

  const isDisabled = !videoId || !input || isLoading

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-stretch gap-6 p-6">
        <div className="grid grid-rows-2 flex-1 gap-4">
          <Textarea
            className="resize-none p-4 leading-relaxed"
            aria-label="Aqui você pode acessar ou editar o prompt para a IA"
            placeholder="Inclua o prompt para a IA..."
            value={input}
            onChange={handleInputChange}
          />

          <Textarea
            className="resize-none p-4 leading-relaxed"
            aria-label="O resultado gerado pela IA é colocado aqui"
            placeholder="Resultado gerado pela IA..."
            value={completion}
            readOnly
          />
        </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Prompt</Label>

              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select disabled defaultValue="gpt3.5">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="flex items-center justify-between">
                <span>Temperatura</span>
                <span className="text-xs text-muted-foreground">
                  {temperature}
                </span>
              </Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="block text-xs text-muted-foreground leading-relaxed italic">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis erros
              </span>
            </div>

            <Separator />

            <Button disabled={isDisabled} type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>

      <p className="text-sm text-muted-foreground px-6 pb-6">
        Lembre-se: você pode utilizar a variável{' '}
        <code className="text-violet-400">{'{transcription}'}</code> no seu
        prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
      </p>
    </div>
  )
}
