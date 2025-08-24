import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useGoBack } from '../lib'

type GoBackProps = {
    label?: string
}

const GoBack = ({ label = "Back" }: GoBackProps) => {
    const goBack = useGoBack()

    return (
        <div onClick={goBack} className="flex items-center gap-x-1 cursor-pointer">
            <ArrowLeftIcon className="size-4" />
            <p className="text-xs font-medium">{label}</p>
        </div>
    )
}

export default GoBack
