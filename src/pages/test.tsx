import { useState, useEffect } from 'react'
import Image from 'next/image'
import { supabaseStore } from '@/store'

export default function MyComponent(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImage() {
      const response = await supabaseStore.storage
      .from('silicai-bucket')
      .download('avatar.png');
      const blob = response.data as Blob;
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
      setImageUrl(dataUrl)
    }

    fetchImage()
  }, [])

  if (!imageUrl) {
    return <div>Loading...</div>
  }

  return <Image src={imageUrl} alt="My Image" width={500} height={500} />
}
