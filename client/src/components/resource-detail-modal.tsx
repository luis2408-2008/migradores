import { Resource } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResourceDetailModalProps {
  resource: Resource;
}

export default function ResourceDetailModal({ resource }: ResourceDetailModalProps) {
  // Este componente muestra un modal con el contenido HTML del recurso
  // El texto de resumen se genera en la vista previa de la tarjeta

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
        <div className="mt-4 prose dark:prose-invert prose-headings:font-display prose-headings:font-semibold prose-a:text-primary prose-ul:pl-6 prose-ol:pl-6 prose-li:marker:text-primary dark:prose-li:marker:text-primary-300 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: resource.content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
}