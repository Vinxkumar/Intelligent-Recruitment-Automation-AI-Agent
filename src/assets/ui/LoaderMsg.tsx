import { Button } from "../../../@/components/ui/button"
import { Spinner } from "../../../@/components/ui/spinner"

type Msg = {
    msg: string,
}


const LoaderMsg = ({msg}: Msg) =>{
  return (
    <div className="flex flex-col items-center gap-4">
      {/* <Button disabled size="sm">
        <Spinner data-icon="inline-start" />
        {msg}
      </Button> */}
      {/* <Button variant="outline" disabled size="sm">
        <Spinner data-icon="inline-start" />
        {msg}
      </Button> */}
      <Button variant="secondary" disabled size="sm">
        <Spinner data-icon="inline-start" />
        {msg}
      </Button>
    </div>
  )
}

export default LoaderMsg