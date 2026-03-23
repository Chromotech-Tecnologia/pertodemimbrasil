import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  className?: string;
  aspectRatio?: 'square' | 'wide' | 'auto';
}

export function ImageUpload({ value, onChange, onRemove, label = 'Upload imagem', className, aspectRatio = 'auto' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : aspectRatio === 'wide' ? 'aspect-video' : 'min-h-[120px]';

  return (
    <div className={cn('relative', className)}>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {value ? (
        <div className={cn('relative overflow-hidden rounded-lg border border-border/50', aspectClass)}>
          <img src={value} alt={label} className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
              <Upload className="mr-1 h-3 w-3" /> Trocar
            </Button>
            {onRemove && (
              <Button size="sm" variant="destructive" onClick={onRemove}>
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border/50 bg-muted/30 p-6 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50',
            aspectClass
          )}
        >
          <ImageIcon className="h-8 w-8" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      )}
    </div>
  );
}

interface MultiImageUploadProps {
  values: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  label?: string;
}

export function MultiImageUpload({ values, onChange, max = 10, label = 'Adicionar fotos' }: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newUrls = Array.from(files).slice(0, max - values.length).map(f => URL.createObjectURL(f));
    onChange([...values, ...newUrls]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeAt = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {values.map((url, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border border-border/50">
            <img src={url} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {values.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border/50 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/30"
          >
            <Upload className="h-5 w-5" />
            <span className="text-[10px]">{label}</span>
          </button>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{values.length}/{max} fotos</p>
    </div>
  );
}
