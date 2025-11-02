import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alarm, RepeatType, FlashMode, REPEAT_LABELS, FLASH_INTERVALS, WEEKDAY_LABELS } from "@/lib/types";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface AddAlarmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alarm?: Alarm;
  onSave: (alarm: Alarm) => void;
  isPro: boolean;
}

export const AddAlarmDialog = ({ open, onOpenChange, alarm, onSave, isPro }: AddAlarmDialogProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Alarm>>(
    alarm || {
      time: '07:00',
      enabled: true,
      repeat: 'daily' as RepeatType,
      flashMode: 'steady' as FlashMode,
      flashInterval: 5,
      screenLight: true,
      label: '',
      selectedDays: [],
    }
  );

  const handleSave = () => {
    const newAlarm: Alarm = {
      id: alarm?.id || Date.now().toString(),
      time: formData.time || '07:00',
      enabled: formData.enabled ?? true,
      repeat: formData.repeat || 'daily',
      flashMode: formData.flashMode || 'steady',
      flashInterval: formData.flashInterval,
      screenLight: formData.screenLight ?? false,
      label: formData.label,
      selectedDays: formData.selectedDays,
    };
    onSave(newAlarm);
    onOpenChange(false);
  };

  const toggleDay = (day: number) => {
    const currentDays = formData.selectedDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day].sort();
    setFormData({ ...formData, selectedDays: newDays });
  };

  const handleFlashModeChange = (mode: FlashMode) => {
    if (mode === 'interval' && !isPro) {
      navigate('/pro');
      return;
    }
    setFormData({ ...formData, flashMode: mode });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{alarm ? 'Alarmı Düzenle' : 'Yeni Alarm'}</DialogTitle>
          <DialogDescription>
            Alarm ayarlarını düzenleyin
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="time">Saat</Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="label">Etiket (opsiyonel)</Label>
            <Input
              id="label"
              placeholder="Sabah alarmı"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="repeat">Tekrar</Label>
            <Select
              value={formData.repeat}
              onValueChange={(value) => setFormData({ ...formData, repeat: value as RepeatType })}
            >
              <SelectTrigger id="repeat">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(REPEAT_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.repeat === 'custom' && (
            <div>
              <Label>Günler</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(WEEKDAY_LABELS).map(([day, label]) => {
                  const dayNum = parseInt(day);
                  const isSelected = (formData.selectedDays || []).includes(dayNum);
                  return (
                    <div
                      key={day}
                      onClick={() => toggleDay(dayNum)}
                      className={`flex items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="flashMode">Flaş Modu</Label>
            <Select
              value={formData.flashMode}
              onValueChange={handleFlashModeChange}
            >
              <SelectTrigger id="flashMode">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="off">Kapalı</SelectItem>
                <SelectItem value="steady">Sabit flaş (Ücretsiz)</SelectItem>
                <SelectItem value="interval">
                  <div className="flex items-center gap-2">
                    Aralıklı flaş
                    {!isPro && <Crown className="w-4 h-4 text-accent" />}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.flashMode === 'interval' && (
            <div>
              <Label htmlFor="flashInterval">Flaş Aralığı (saniye)</Label>
              <Select
                value={formData.flashInterval?.toString()}
                onValueChange={(value) => setFormData({ ...formData, flashInterval: parseInt(value) })}
              >
                <SelectTrigger id="flashInterval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FLASH_INTERVALS.map((interval) => (
                    <SelectItem key={interval} value={interval.toString()}>
                      {interval} saniye
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="screenLight">Ekran ışığı</Label>
            <Switch
              id="screenLight"
              checked={formData.screenLight}
              onCheckedChange={(checked) => setFormData({ ...formData, screenLight: checked })}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              İptal
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Kaydet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
