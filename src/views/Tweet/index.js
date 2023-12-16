'use client'

import ShowMoreText from '@/components/ui/ShowMoreText'
import { contentData } from './dunmmy'

const TweetView = () => <ShowMoreText text={contentData?.content} lines={5} />

export default TweetView
