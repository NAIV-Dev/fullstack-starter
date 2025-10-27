import { IDRFormatter } from "@/utility";

interface TrxItemBreakdownProps {
  data: {
    name: string
    price: number
    qty: number
  }[]
}

export function TrxItemBreakdown(props: TrxItemBreakdownProps) {
  return (
    <div className="flex flex-col gap-4">
      {
        props.data.map((item, i: number) => (
          <div
            key={i}
            className="flex justify-between border-t border-t-px border-t-black/10 pt-2">
            <div className="flex flex-col gap-0">
              <div>
                { item.name }
              </div>
              <div>
                { IDRFormatter.format(item.price) }
              </div>
            </div>
            <div className={`
              flex flex-col gap-0 text-right
              lg:flex-row
            `}>
              <div>
                x{ (item.qty || 0) }
              </div>
              <div className="lg:w-35 font-bold">
                { IDRFormatter.format(item.price * (item.qty || 0)) }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
