import LikeDislike from "./components/LikeDislike";

export default function Home() {
  return (
    <main className="container" style={{ maxWidth: "1060px !important" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h1 className="text-center fw-bold mt-5">
            Sistema de Likes y Dislikes con Next.JS <hr />
          </h1>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-12">
          <LikeDislike />
        </div>
      </div>
    </main>
  );
}
