import { ArrowUpRight, GraduationCap } from "lucide-react";

export default function AcademicHighlights() {
  return <section className="academic-highlights" aria-labelledby="academic-heading">
    <div className="academic-heading"><div><span className="section-overline">THE FOUNDATION / ACADEMICS</span><h3 id="academic-heading">A little of the <em>on-paper story.</em></h3></div><GraduationCap size={28} aria-hidden="true"/></div>
    <div className="academic-scores">
      <article className="academic-score academic-cgpa"><div className="academic-score-label"><span>CURRENT COLLEGE CGPA</span><ArrowUpRight size={17} aria-hidden="true"/></div><strong>9.40</strong><h4>BTech · Current CGPA</h4><p>KJ Somaiya College of Engineering</p></article>
      <article className="academic-score" data-spotlight><div className="academic-score-label"><span>CLASS XII</span><span>12</span></div><strong>96<span>%</span></strong><h4>Class 12</h4><p>Navy Children School</p></article>
      <article className="academic-score" data-spotlight><div className="academic-score-label"><span>CLASS X</span><span>10</span></div><strong>92.4<span>%</span></strong><h4>Class 10</h4><p>Navy Children School</p></article>
    </div>
    <div className="academic-degree"><div><span className="academic-degree-label">CURRENTLY PURSUING</span><h4>BTech in Electronics and Computer Engineering</h4><p>KJ Somaiya College of Engineering</p></div><div className="academic-specialisations"><span>Honours in DevOps and MLOps</span><span>Minor in Fintech</span></div></div>
  </section>;
}
