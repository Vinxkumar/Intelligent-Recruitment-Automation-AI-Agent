import { InfoIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../@/components/ui/alert";

interface AlertMsgProps {
  msg: string;
}

const AlertMsg = ({ msg }: AlertMsgProps) => {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <Alert>
        <InfoIcon />
        <AlertTitle>{msg}</AlertTitle>
        <AlertDescription></AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertMsg;