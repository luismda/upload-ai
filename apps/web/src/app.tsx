import { Github, Wand2 } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'

import { Label } from './components/ui/label'
import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Textarea } from './components/ui/textarea'
import { Separator } from './components/ui/separator'
import { VideoInputForm } from './components/video-input-form'

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💜 no NLW da Rocketseat
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      <main className="flex-1 flex items-stretch gap-6 p-6">
        <div className="grid grid-rows-2 flex-1 gap-4">
          <Textarea
            className="resize-none p-4 leading-relaxed"
            aria-label="Aqui você pode acessar ou editar o prompt para a IA"
            placeholder="Inclua o prompt para a IA..."
          />

          <Textarea
            className="resize-none p-4 leading-relaxed"
            aria-label="O resultado gerado pela IA é colocado aqui"
            placeholder="Resultado gerado pela IA..."
            readOnly
          />
        </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm />

          <Separator />

          <form className="space-y-6">
            <div className="space-y-2">
              <Label>Prompt</Label>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="title">Título do YouTube</SelectItem>
                  <SelectItem value="desc">Descrição do YouTube</SelectItem>

                  <SelectItem value="" disabled>
                    Criar novo (em breve)
                  </SelectItem>
                </SelectContent>
              </Select>
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
                <span className="text-xs text-muted-foreground">0.5</span>
              </Label>

              <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />

              <span className="block text-xs text-muted-foreground leading-relaxed italic">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis erros
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full">
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
