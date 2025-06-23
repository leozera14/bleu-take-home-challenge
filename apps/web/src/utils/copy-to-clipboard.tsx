import { Copy } from "lucide-react";
import { toast } from "react-toastify";

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);

  toast.success("Address successfully copied!")
};

export const CopyAddressComponent = ({address}: {address: string}) => {
  return (
    <div title='Copy Address'>
      <Copy 
        className='cursor-pointer w-3.5 h-3.5'
        onClick={() => copyToClipboard(address)}
      />
    </div>
  )
}