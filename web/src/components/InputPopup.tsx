import { Input, InputProps, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useEffect, useState } from "react";

interface InputPopupProps extends InputProps {
  items: {key: any, label: string}[]
  selected: any
  onSelectedChange(selected: any): void
}

export function InputPopup(props: InputPopupProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [q, setQ] = useState<string>('');
  const [filtered_items, setFilteredItems] = useState<{key: any, label: string}[]>(props.items);

  useEffect(() => {
    if (open) {
      setQ('');
      setFilteredItems(props.items);
    }
  }, [open]);

  useEffect(() => {
    setFilteredItems(props.items.filter(item => item.label.toLowerCase().includes(q)))
  }, [q]);

  return (
    <>
      <Input 
        {...props}
        readOnly
        onClick={() => setOpen(true)}
        value={props.items.find(item => item.key == props.selected)?.label}
        classNames={{
          inputWrapper: "cursor-pointer",
          input: "cursor-pointer",
          innerWrapper: "cursor-pointer",
        }} />
      <Modal isOpen={open} onOpenChange={setOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="bg-white w-full">
                  <Input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    className="w-full"
                    placeholder="Cari Layanan" />
                </div>
              </ModalHeader>
              <ModalBody className="min-h-[80dvh] max-h-[80dvh] overflow-y-auto px-2 space-y-0 gap-1">
                {
                  filtered_items.map(item => (
                    <div 
                      onClick={() => {
                        props.onSelectedChange(item.key);
                        setOpen(false);
                      }}
                      className={`p-1 px-3 rounded-lg hover:bg-zinc-200 cursor-pointer ${props.selected == item.key ? 'font-bold text-sky-500' : ''}`}
                      key={item.key}>
                      { item.label }
                    </div>
                  ))
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
