import { useMemo, useState } from "react";

import CalculatorContainer
  from "../CalculatorContainer";

import ResultBox
  from "../ResultBox";

import ResultGrid
  from "../ResultGrid";

import ResetButton
  from "../ResetButton";


const createSubject = (id) => ({
  id,
  name: "",
  gradePoint: "",
  credits: "",
});


const initialSubjects = [
  createSubject(1),
  createSubject(2),
  createSubject(3),
];


export default function GpaCgpaCalculatorUI() {

  const [subjects, setSubjects] =
    useState(initialSubjects);


  const updateSubject = (
    id,
    field,
    value
  ) => {

    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]: value,
            }
          : subject
      )
    );

  };


  const addSubject = () => {

    setSubjects((currentSubjects) => {

      const nextId =
        currentSubjects.length > 0
          ? Math.max(
              ...currentSubjects.map(
                (subject) => subject.id
              )
            ) + 1
          : 1;

      return [
        ...currentSubjects,
        createSubject(nextId),
      ];

    });

  };


  const removeSubject = (id) => {

    if (subjects.length <= 1) {
      return;
    }

    setSubjects((currentSubjects) =>
      currentSubjects.filter(
        (subject) =>
          subject.id !== id
      )
    );

  };


  const result = useMemo(() => {

    let totalWeightedPoints = 0;

    let totalCredits = 0;

    let completedSubjects = 0;


    subjects.forEach((subject) => {

      const gradePoint =
        Number(subject.gradePoint);

      const credits =
        Number(subject.credits);


      if (
        Number.isFinite(gradePoint) &&
        Number.isFinite(credits) &&
        gradePoint >= 0 &&
        credits > 0
      ) {

        totalWeightedPoints +=
          gradePoint * credits;

        totalCredits += credits;

        completedSubjects++;

      }

    });


    if (totalCredits === 0) {
      return null;
    }


    const gpa =
      totalWeightedPoints /
      totalCredits;


    return {
      gpa,
      totalCredits,
      completedSubjects,
    };

  }, [subjects]);


  const resetCalculator = () => {

    setSubjects([
      createSubject(1),
      createSubject(2),
      createSubject(3),
    ]);

  };


  return (

    <CalculatorContainer>


      {/* SUBJECTS */}

      <div className="gpa-subject-list">

        {subjects.map(
          (subject, index) => (

            <div
              className="gpa-subject"
              key={subject.id}
            >

              <div className="gpa-subject-header">

                <strong>
                  Subject {index + 1}
                </strong>

                {subjects.length > 1 && (

                  <button
                    type="button"
                    className="gpa-remove-button"
                    onClick={() =>
                      removeSubject(
                        subject.id
                      )
                    }
                  >
                    Remove
                  </button>

                )}

              </div>


              {/* SUBJECT NAME */}

              <div className="input-group">

                <label>
                  Subject Name
                </label>

                <input
                  type="text"
                  value={subject.name}
                  placeholder="e.g. Mathematics"
                  onChange={(event) =>
                    updateSubject(
                      subject.id,
                      "name",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* GRADE POINT */}

              <div className="input-group">

                <label>
                  Grade Point
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={subject.gradePoint}
                  placeholder="e.g. 9"
                  onChange={(event) =>
                    updateSubject(
                      subject.id,
                      "gradePoint",
                      event.target.value
                    )
                  }
                />

              </div>


              {/* CREDITS */}

              <div className="input-group">

                <label>
                  Credits
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={subject.credits}
                  placeholder="e.g. 4"
                  onChange={(event) =>
                    updateSubject(
                      subject.id,
                      "credits",
                      event.target.value
                    )
                  }
                />

              </div>

            </div>

          )
        )}

      </div>


      {/* ADD SUBJECT */}

      <button
        type="button"
        className="gpa-add-button"
        onClick={addSubject}
      >
        + Add Subject
      </button>


      {/* RESULTS */}

      <ResultGrid>

        <ResultBox
          label="GPA"
          value={
            result
              ? result.gpa.toFixed(2)
              : "—"
          }
        />


        <ResultBox
          label="Total Credits"
          value={
            result
              ? result.totalCredits
              : "—"
          }
        />


        <ResultBox
          label="Subjects Included"
          value={
            result
              ? result.completedSubjects
              : "—"
          }
        />

      </ResultGrid>


      {/* EXPLANATION */}

      <div className="calculator-note">

        <strong>
          How GPA is calculated
        </strong>

        <p>
          GPA is calculated using the
          credit-weighted average of the
          entered grade points.
        </p>

        <p>
          <strong>
            GPA = Σ(Grade Point × Credits)
            ÷ ΣCredits
          </strong>
        </p>

        <p>
          Subjects without a valid grade
          point or credit value are not
          included in the calculation.
        </p>

        <p>
          This calculator does not assume
          a specific university's grading
          scale. Enter the grade points
          according to your institution's
          grading system.
        </p>

      </div>


      {/* RESET */}

      <ResetButton
        onReset={resetCalculator}
      />

    </CalculatorContainer>

  );

}