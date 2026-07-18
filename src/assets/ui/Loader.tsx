import { Spinner } from "../../../@/components/ui/spinner"

const Loader =() => {
  return (
    <div className="flex items-center gap-6">
      {/* <Spinner className="size-3" /> */}
      {/* <Spinner className="size-4" /> */}
      {/* <Spinner className="size-6" /> */}
      <Spinner className="size-8" />
    </div>
  )
}

export default Loader
