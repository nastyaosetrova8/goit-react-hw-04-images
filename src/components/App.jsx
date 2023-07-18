import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import { requestImageGallery } from 'services/api';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { useEffect, useState } from 'react';


export default function App () {
  
const [searchQuery, setSearchQuery] = useState('');
const [gallery, setGallery] = useState([]);
const [page, setPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [modal, setModal] = useState({ isOpen: false, modalData: null });
const [totalHits, setTotalHits] = useState(null);


  useEffect (() => {
    if (!searchQuery || !page) return;

      const fetchGallery = async () => {
        try {
          setIsLoading(true);
    
          const imgGallery = await requestImageGallery(searchQuery, page);
    
          setGallery(prevState => {
            return  page === 1
            ? imgGallery.hits
            : [...prevState, ...imgGallery.hits]});

          setTotalHits(imgGallery.totalHits);
    
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchGallery(); 
      // (searchQuery, page)
    
  }, [page, searchQuery]);

 

  function loadMore() {
    setPage(prevState => (prevState + 1));
  }

  const onFormSubmit = searchQuery => {
    setSearchQuery(searchQuery); 
    setPage(1);
  };

  const onOpenModal = data =>
  setModal({ isOpen: true, modalData: data });

  const onCloseModal = () =>
  setModal({ isOpen: false, modalData: null });


    const showLoader = isLoading;
    const showError = error;
    return (
      <div>
        <Searchbar onFormSubmit={onFormSubmit} />

        {showLoader && (<Loader />)}

        {showError && (
          <div>
            <p>Opps, some error occured... Error: {error}</p>
          </div>
        )}


        {gallery.length > 0 && <ImageGallery
      onOpenModal={onOpenModal}
      images={gallery}
      />}

        {modal.isOpen && (
          <Modal
            onCloseModal={onCloseModal}
            modalData={modal.modalData}
          />
        )}

        {gallery.length > 0 &&
          gallery.length < totalHits && (
            <Button text="Load more" handleClick={loadMore} />
          )}
      </div>
    );
  }

