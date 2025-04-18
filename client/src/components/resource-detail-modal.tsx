import { Resource } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResourceDetailModalProps {
  resource: Resource;
}

export default function ResourceDetailModal({ resource }: ResourceDetailModalProps) {
  // Extrae un resumen del texto sin etiquetas HTML
  const getTextSummary = (htmlContent: string, length = 200) => {
    // Eliminar etiquetas HTML
    const plainText = htmlContent.replace(/<[^>]*>/g, '');
    // Obtener un extracto del texto
    return plainText.length > length 
      ? plainText.slice(0, length) + '...' 
      : plainText;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 mt-2 h-auto">
          Leer más
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{resource.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 prose dark:prose-invert prose-headings:font-display prose-headings:font-semibold prose-a:text-primary max-w-none">
          <div dangerouslySetInnerHTML={{ __html: resource.content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
}