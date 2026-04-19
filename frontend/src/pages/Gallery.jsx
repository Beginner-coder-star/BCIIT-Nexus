import { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const imagesPerPage = 12;

  // Fetch gallery images from backend
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/gallery/list");

        // or use .env
        if (res.data.success) {
          setGalleryImages(res.data.gallery.reverse()); // reverse for latest first
        }
      } catch (error) {
        console.log("Error fetching gallery:", error);
      }
    };
    fetchGallery();
  }, []);

  const totalPages = Math.ceil(galleryImages.length / imagesPerPage);
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = galleryImages.slice(indexOfFirstImage, indexOfLastImage);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="p-4 sm:p-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {currentImages.map((image) => (
          <div
            key={image._id}
            className="relative overflow-hidden rounded-lg cursor-pointer flex justify-center items-center"
            onClick={() => setFullscreenImage(image.gelimage)}
          >
            <img
              src={image.gelimage}
              alt="Event"
              className="w-full sm:w-[300px] md:w-[340px] h-[140px] sm:h-[160px] md:h-[180px] object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 space-x-3">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 border rounded-md">{currentPage} / {totalPages}</span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-2 sm:p-5"
          onClick={() => setFullscreenImage(null)}
        >
          <img src={fullscreenImage} alt="Fullscreen" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
