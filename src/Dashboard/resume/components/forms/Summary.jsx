import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIchatSession } from './../../../../../service/AIModel';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of summary for 3 Senior level, Mid Level and entry level in 3 - 4 lines in array format, With summary and experience_level Field in JSON Format"
function Summary({enableNext}) {
  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext);
  const [summary, setSummary]=useState();
  const [loading, setLoading]=useState(false);
  const params=useParams();
  const [aiGeneratedSummaryList,setAiGeneratedSummaryList]=useState();
  useEffect(()=>{
    summary&&setResumeInfo({
      ...resumeInfo,
      summary:summary
    })
  },[summary])

  const GenerateSummaryFromAI=async()=>{
    setLoading(true)
    const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result=await AIchatSession.sendMessage(PROMPT);
    console.log(JSON.parse(result.response.text()));
    setAiGeneratedSummaryList(JSON.parse(result.response.text()))
    setLoading(false)
  }

  const onSave=(e)=>{
    e.preventDefault();
      setLoading(true);
      const data={
        data:{
          summary:summary
        }
      }
      GlobalApi.UpdateResumeDetail(params?.resumeid,data).then(resp=>{
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast("Details updated")
      },(error)=>{
        setLoading(false);
      })
  }
  return (
    <div>
      <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add your summary here</p>
        <form className='mt-7' onSubmit={onSave}>
          <div className='flex justify-between items-end'>
            <label>Add Summary</label>
            <Button variant ="outline" onClick={()=>GenerateSummaryFromAI()} type="button" size ="sm" className="border-primary text-primary flex gap-2"> <Brain className='h-4 w-4'/>Generate With AI</Button>
          </div>
          <Textarea className="mt-5" required onChange={(e)=>setSummary(e.target.value)}/>
          <div className='mt-2 flex justify-end'>
          <Button type="submit"
            disabled={loading}>
              {loading?<LoaderCircle className='animate-spin'/>:'Save'}
              </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummaryList&& <div>
        <h2 className='font-bold text-lg'>Suggestions</h2>
        {aiGeneratedSummaryList?.map((item,index)=>(
          <div>
            <h2 className='font-bold my-1'>Level: {item?.experience_level}</h2>
            <p>{item?.summary}</p>
          </div>
        ))}
      </div>}
    </div>
  )
}

export default Summary