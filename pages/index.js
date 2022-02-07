import React, { useState, useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Formik, Field, Form } from "formik"

export default function Home() {
  const [summary, setSummary] = useState('')
  const [showSuccess, setShowSuccess] = useState(false);
  const textAreaRef = useRef(null);

  const handleTextChange = (event) => {
    setSummary(event.target.value);
  };

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
  };

  return (
    <div>
      <Head>
        <title>Session-note-omatic</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous" />
      </Head>

      <main className='container'>
        <h1 className='mb-4'>
          Session-note-omatic
        </h1>
        <Formik
          initialValues={{ name: '', activity: '', task: '', answered: '', asked: '', cues: '', skills: '', gender: '' }}
          onSubmit={(values) => {
            const { name, activity, task, answered, asked, cues, skills, gender } = values;
            const pronoun = gender == "M" ? "He" : "She";
            const text = `${name} was alert and compliant throughout the duration of this session. ${pronoun} completed ${activity} in which ${pronoun.toLowerCase()} had to ${task}. ${name} answered ${answered}/${asked} questions. ${pronoun} benefitted from ${cues}. Clinician will continue targeting ${name}'s ability to ${skills}.`;
            setSummary(text);
          }}
        >
          {({ isSubmitting, handleReset }) => (
            <Form>
              <div className="row g-3 mb-3">
                <div className="col-auto">
                  <Field id="name" type="text" name="name" className="form-control" placeholder="Student Name" />
                </div>
              </div>
              <div className='mb-3'>
                <div className="form-check form-check-inline">
                  <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="M" />
                  <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                </div>
                <div className="form-check form-check-inline">
                  <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="F" />
                  <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-8">
                  <Field id="activity" type="text" name="activity" className="form-control" placeholder="Activity" />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-8">
                  <Field id="task" type="text" name="task" className="form-control" placeholder="Task" />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-1">
                  <Field id="answered" type="text" name="answered" className="form-control" placeholder="1" />
                </div>
                <div className='col-1'>
                  <span>out of</span>
                </div>
                <div className='col-1'>
                  <Field id="asked" type="text" name="asked" className="form-control" placeholder="10" />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-8">
                  <Field id="cues" type="text" name="cues" className="form-control" placeholder="Type of Cues" />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-8">
                  <Field id="skills" type="text" name="skills" className="form-control" placeholder="Skills to target" />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Generate!
              </button>
              <button type="reset" className="btn btn-secondary ms-3" onClick={() => { setSummary('') }}>
                Clear
              </button>
            </Form>
          )}
        </Formik>
        <div className='col-8'>
          <textarea className="form-control mt-3 col-auto" ref={textAreaRef} rows={7} value={summary} onChange={handleTextChange} />
        </div>
        <button type="button" className="btn btn-secondary mt-3" onClick={copyToClipboard}>
          Copy to clipboard
        </button>
        {showSuccess &&
          <span className='ms-3 form-text'>Copied!</span>
        }
      </main>
    </div>
  );
}
