"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "react-use";

// Librería nextjs-toast-notify para notificar al usuario de la forma mas agradable la acción realizada
import { toast } from "nextjs-toast-notify";
import "nextjs-toast-notify/dist/nextjs-toast-notify.css";

const LikeDislike = () => {
  // Estado para los datos de la API
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Consulta de la API al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reqres.in/api/users");
        setData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Estado para los likes y dislikes en el almacenamiento local
  const [likes, setLikes] = useLocalStorage("likes", {});
  const [dislikes, setDislikes] = useLocalStorage("dislikes", {});

  // Función para manejar el like de una persona
  const manejarLike = (id) => {
    // Crear una copia del estado actual de likes
    const updatedLikes = { ...likes };
    // Incrementar el contador de likes para la persona con el id dado
    updatedLikes[id] = (updatedLikes[id] || 0) + 1;
    // Actualizar el estado de likes con la copia actualizada
    setLikes(updatedLikes);

    // Notificar al usuario de la forma mas agradable la acción
    toast.success("¡Like registrado con éxito, gracias 😘!", {
      duration: 3000,
      position: "bottom-center",
      transition: "bounceIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>',
      sonido: true,
    });
  };

  // Función para manejar el dislike de una persona
  const manejarDislike = (id) => {
    // Crear una copia del estado actual de dislikes
    const updatedDislikes = { ...dislikes };
    // Incrementar el contador de dislikes para la persona con el id dado
    updatedDislikes[id] = (updatedDislikes[id] || 0) + 1;
    // Actualizar el estado de dislikes con la copia actualizada
    setDislikes(updatedDislikes);

    // Notificar al usuario de la forma mas agradable la acción
    toast.error("Dislike registrado con éxito, gracias 😭!", {
      duration: 3000,
      position: "top-right",
      transition: "fadeIn",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>',
      sonido: true,
    });
  };

  if (isLoading) {
    return <div className="text-center">Cargando Personas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row justify-content-center">
      {data &&
        data.map((item) => (
          <div
            className="col-md-3 border py-4 px-4 media justify-content-center mb-4 pd-3"
            style={{
              background: "#f0f4f3 !important",
              textAlign: "center",
              marginRight: "10px",
            }}
            key={item.id}
          >
            <Image
              src={item.avatar}
              width={100}
              height={100}
              className="mr-3 latidos-animation"
              alt="perfil"
              style={{ display: "inline-block" }}
            />
            <h4 className="mt-2">
              {item.first_name} {item.last_name}
            </h4>
            <p style={{ display: "flex", justifyContent: "space-around" }}>
              <i
                className="bi bi-emoji-heart-eyes"
                onClick={() => manejarLike(item.id)}
              ></i>
              <i
                className="bi bi-emoji-angry"
                onClick={() => manejarDislike(item.id)}
              ></i>
            </p>
            <p
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <span style={{ color: "green" }}>{likes[item.id] || 0}</span>
              <span style={{ color: "red" }}>{dislikes[item.id] || 0}</span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default LikeDislike;
