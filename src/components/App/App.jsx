import { Section, Container } from './App.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import { Preview } from 'components/Preview/Preview';

export function App() {
  const [itemTag, setItemTag] = useState(null);
  const [preview, setPreview] = useState(true);

  const handleSearchSubmit = itemTag => {
    setItemTag(itemTag);
  };

  const startDiscover = () => {
    setPreview(false);
  };

  if (preview) {
    return <Preview startDiscover={startDiscover} />;
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Searchbar onSubmit={handleSearchSubmit} />
      <Section>
        <Container>
          <ImageGallery itemTag={itemTag} />
        </Container>
      </Section>
    </>
  );
}
