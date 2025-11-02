import { Clock, Zap, Sun, Repeat } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alarm, REPEAT_LABELS, WEEKDAY_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AlarmCardProps {
  alarm: Alarm;
  onToggle: (id: string) => void;
  onClick: (alarm: Alarm) => void;
}

export const AlarmCard = ({ alarm, onToggle, onClick }: AlarmCardProps) => {
  const getRepeatDisplay = () => {
    if (alarm.repeat === 'custom' && alarm.selectedDays && alarm.selectedDays.length > 0) {
      return alarm.selectedDays.map(day => WEEKDAY_LABELS[day]).join(', ');
    }
    return REPEAT_LABELS[alarm.repeat];
  };

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-lg",
        alarm.enabled && "border-primary"
      )}
      onClick={() => onClick(alarm)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-3xl font-bold">{alarm.time}</span>
          </div>
          
          {alarm.label && (
            <p className="text-sm text-muted-foreground mb-2">{alarm.label}</p>
          )}
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Repeat className="w-3 h-3" />
              {getRepeatDisplay()}
            </Badge>
            
            {alarm.flashMode !== 'off' && (
              <Badge variant="default" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                {alarm.flashMode === 'steady' ? 'Sabit flaş' : `${alarm.flashInterval}sn aralık`}
              </Badge>
            )}
            
            {alarm.screenLight && (
              <Badge variant="default" className="flex items-center gap-1">
                <Sun className="w-3 h-3" />
                Ekran ışığı
              </Badge>
            )}
          </div>
        </div>
        
        <Switch
          checked={alarm.enabled}
          onCheckedChange={() => onToggle(alarm.id)}
          onClick={(e) => e.stopPropagation()}
          className="ml-4"
        />
      </div>
    </Card>
  );
};
