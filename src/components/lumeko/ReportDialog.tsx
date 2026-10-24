import { useState } from "react";
import { toast } from "sonner";
import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useStore } from "@/lib/store";

const REASONS = [
  "Contenido inapropiado o sexual",
  "Acoso, odio o violencia",
  "Riesgo para menores",
  "Spam o engaño",
  "Infracción de derechos de autor",
  "Otro motivo",
];

export function ReportDialog({
  targetId, targetName, trigger,
}: { targetId: string; targetName: string; trigger?: React.ReactNode }) {
  const { block } = useStore();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [alsoBlock, setAlsoBlock] = useState(false);

  const submit = () => {
    if (alsoBlock) block({ id: targetId, name: targetName, type: "personaje" });
    toast.success("Reporte enviado (demo)", {
      description: "En esta versión de prueba el reporte no se envía a ningún servidor.",
    });
    setOpen(false);
    setReason("");
    setDetails("");
    setAlsoBlock(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <Flag className="size-4" /> Reportar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar a {targetName}</DialogTitle>
          <DialogDescription>Ayúdanos a mantener Lumeko seguro. Elige el motivo principal.</DialogDescription>
        </DialogHeader>
        <RadioGroup value={reason} onValueChange={setReason} className="gap-2">
          {REASONS.map((r) => (
            <Label key={r} className="flex cursor-pointer items-center gap-3 rounded-md border p-2.5 font-normal has-[[data-state=checked]]:border-primary">
              <RadioGroupItem value={r} /> {r}
            </Label>
          ))}
        </RadioGroup>
        <div className="space-y-1.5">
          <Label htmlFor="rep-details">Detalles (opcional)</Label>
          <Textarea id="rep-details" maxLength={500} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Describe lo que ocurrió…" />
          <p className="text-right text-xs text-muted-foreground">{details.length}/500</p>
        </div>
        <Label className="flex items-center gap-2 font-normal">
          <Checkbox checked={alsoBlock} onCheckedChange={(v) => setAlsoBlock(v === true)} /> Bloquear también a este personaje
        </Label>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="destructive" disabled={!reason} onClick={submit}>Enviar reporte</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
