import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useGoBack } from '../lib'

const GoBack = () => {

    const goBack = useGoBack()

    return (
        <div onClick={goBack} className="flex items-center gap-x-1 cursor-pointer">

            <ArrowLeftIcon className='size-4' />

            <p className='text-xs font-medium'>Back</p>

        </div>
    )
}

export default GoBack