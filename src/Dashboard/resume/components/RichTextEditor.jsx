import React, { useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'

function RichTextEditor() {
    const [value,setValue]=useState();
  return (
    <div>
        <EditorProvider>
        <Editor value={value} onChange={(e)=>{
            setValue(e.target.value)
        }}>
            <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <BtnBulletList />
                <Separator />
                <BtnLink />
            </Toolbar>

        </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor