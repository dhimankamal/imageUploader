import { useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from './firebase'

function App () {
  const [progress, setProgress] = useState(0)
  const formHandler = e => {
    e.preventDefault()
    const file = e.target[0].files[0]
    uploadFiles(file)
  }

  const uploadFiles = file => {
    //
    if (!file) return
    const sotrageRef = ref(storage, `files/${file.name}`)
    const uploadTask = uploadBytesResumable(sotrageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      },
      error => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          console.log('File available at', downloadURL)
        })
      }
    )
  }

  return (
    <div className='App'>
      <div className='wrapper'>
        <header>File Uploader JavaScript</header>
        <form onSubmit={formHandler}>
          <input type='file' className='file-input input' />
          <button type='submit'>Upload</button>
        </form>
       
        <section className='progress-area'>
          <li class='row'>
            <i class='fas fa-file-alt'></i>
            <div class='content'>
              <div class='details'>
                <span class='name'>{progress} • Uploading</span>
                <span class='percent'>%</span>
              </div>
              <div class='progress-bar'>
                <div class='progress' style={{width:progress+"%"}}></div>
              </div>
            </div>
          </li>
        </section>
        <section className='uploaded-area' />
      </div>
    </div>
  )
}

export default App
