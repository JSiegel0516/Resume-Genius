import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import RichTextEditor from '../RichTextEditor';
const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}
function Experience() {
    const [experienceList,setExperienceList]=useState([
        formField
    ])

    const handleChange=(index,event)=>{

    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Experience</h2>
        <p>Put any relevant experience that pertains to your field</p>
        <div>
            {experienceList.map((item,index)=>(
                <div>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label className='text-xs'>Position Title</label>
                            <Input name="title" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Company Name</label>
                            <Input name="companyName" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>City</label>
                            <Input name="city" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>State</label>
                            <Input name="state" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>Start Date</label>
                            <Input type="date" name="startDate" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div>
                            <label className='text-xs'>End Date</label>
                            <Input type="date" name="endDate" onChange={(event)=>handleChange(index,event)}/>
                        </div>
                        <div className='col-span-2'>
                            {/*Work Summary*/}
                            <RichTextEditor/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <Button variant="outline" className="text-primary">Add Experience</Button>
            <Button>Save</Button>
        </div>
        </div>
    </div>
  )
}

export default Experience