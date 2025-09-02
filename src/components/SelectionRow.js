import React from 'react'

export default function SelectionRow({ theme, 
                                        theme1S, 
                                        theme2S, 
                                        theme3S, 
                                        year7S,
                                        year8S,
                                        year9S,
                                        theme1F, 
                                        theme2F, 
                                        theme3F, 
                                        ks3Ks4,
                                        lesson, 
                                        chooseTheme, 
                                        chooseLesson, 
                                        restartThemeSelection, 
                                        restartLessonSelection }) {

    // Determine the first key of the selected theme (for initial rendering purposes)
    const firstKey = Object.keys(theme)[0];
    const lessons = Object.keys(theme);

  return (
    <div className='selection-row'>

        <div className='theme-list'>
            {!theme && <>
                {ks3Ks4 ? (<h2>Choose Theme</h2>) : (<h2>Choose Course</h2>)}
                {ks3Ks4 &&<>
                  <p className="theme-choice" onClick={() => chooseTheme(theme1S)}>Theme 1</p>
                  <p className="theme-choice" onClick={() => chooseTheme(theme2S)}>Theme 2</p>
                  <p className="theme-choice" onClick={() => chooseTheme(theme3S)}>Theme 3</p>
                </>}
                {!ks3Ks4 &&<>
                  <p className="theme-choice" onClick={() => chooseTheme(year7S)}>Year 7: Viva 1</p>
                  <p className="theme-choice" onClick={() => chooseTheme(year8S)}>Year 8: Viva 2</p>
                  <p className="theme-choice" onClick={() => chooseTheme(year9S)}>Year 9: Viva 3 Rojo</p>
                </>}

            </>}
            {theme && <>
                { ks3Ks4 ? (<h2 className="restart-selection" onClick={restartThemeSelection}>Selected Theme</h2>) :
                 (<h2 className="restart-selection" onClick={restartThemeSelection}>Selected Course</h2>)}
                {theme === theme1S && <p>Theme 1</p>}
                {theme === theme2S && <p>Theme 2</p>}
                {theme === theme3S && <p>Theme 3</p>}
                {theme === year7S && <p>Year 7: Viva 1</p>}
                {theme === year8S && <p>Year 8: Viva 2</p>}
                {theme === year9S && <p>Year 9: Viva 3 Rojo</p>}
            </>}
          </div>

      <div className='lesson-list'>
        {!theme && 
          <>
              <h2 className='dummy'>dummy</h2>
              <p className='dummy'>dummy</p>
              <p className='dummy'>dummy</p>
              <p className='dummy'>dummy</p>
        </>}      
        {theme && !lesson && <>
        <h2>Choose Lesson</h2>
        <div className='lesson-wrapper1'>
            <div className='lesson-wrapper2'>
                {theme.map((lesson, index) => (
                    <p 
                      className="lesson-choice" 
                      key={index} 
                      onClick={() => chooseLesson(lesson)}>
                        {lesson[0]}
                    </p>
                ))}
            </div>
        </div>
        </>}
        {theme && lesson && <>
            <h2 className="restart-selection" onClick={restartLessonSelection}>Selected Lesson</h2>
            <div className=''>
                <p>{lesson[0]}</p>
            </div>
          </>}
      </div>
      
    </div>
  )
}
