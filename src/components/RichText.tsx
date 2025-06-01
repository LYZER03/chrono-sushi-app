import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

// Basic JSX converter for rendering Lexical content
const jsxConverter: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
})

export function RichText(props: Props) {
  const { data, className, ...rest } = props

  return (
    <RichTextConverter
      {...rest}
      data={data}
      className={className}
      converters={jsxConverter}
    />
  )
}