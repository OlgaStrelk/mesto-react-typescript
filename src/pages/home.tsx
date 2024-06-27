import { useState, useEffect, SetStateAction } from "react";
import "../index.css";

import {
  getInitialCards,
  editProfile,
  changeUserPic,
  addCard,
  changeLikeCardStatus,
  deleteCard,
} from "../utils/api";
import { checkToken } from "../utils/authApi";
import { IUser } from "../utils/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getProfile, selectUserId } from "../store/slices/userSlice";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import EditProfilePopup from "../components/EditProfilePopup";
import Footer from "../components/Footer";
import ImagePopup from "../components/ImagePopup";
import InfoTooltip from "../components/InfoTooltip";
import Main from "../components/Main";
import PopupWithForm from "../components/PopupWithForm";

function Home() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedCard, handleCardClick] = useState(null);
  const [cardDelete, setCardDelete] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState();
  const [email, setEmail] = useState("");
  const userId = useAppSelector(selectUserId);
  const userStatus = useAppSelector((state) => state.user.status);
  const error = useAppSelector((state) => state.user.error);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getProfile());
    }
    if (error) console.log(`При загрузке данных пользователя: ${error}`);
  }, [dispatch]);

  useEffect(() => {
    getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) =>
        console.log(`При загрузке первоначального массива карточек: ${err}`)
      );
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res: { data: { email: SetStateAction<string> } }) => {
          setEmail(res.data.email);
          // navigate(PATHS.home);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  const handleUpdateUser = (userUpdated: IUser) => {
    editProfile(userUpdated.name, userUpdated.about)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch((err) =>
        console.log(`При обновлении информации о пользователе: ${err}`)
      )
      .then(() => closeAllPopups());
  };

  const handleUpdateAvatar = ({ avatar }: { avatar: string }) => {
    changeUserPic(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .catch((err) =>
        console.log(`При обновлении аватара пользователя: ${err}`)
      )
      .then(() => closeAllPopups());
  };

  const handleAddPlaceSubmit = (name: string, link: string) => {
    addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(`При добавлении новой карточки: ${err}`))
      .then(() => closeAllPopups());
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    handleCardClick(null);
    setTooltipStatus();
  };

  const handleCardLike = (card: { likes: any[]; _id: string }) => {
    const isLiked = card.likes.some((i: { _id: any }) => i._id === userId);

    changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`При изменении состояния лайка: ${err}`));
  };

  const handleCardDeleteRequest = (card: SetStateAction<null>) => {
    setCardDelete(card);
    setDeleteCardPopupOpen(true);
  };

  const handleCardDelete = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    deleteCard(cardDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardDelete._id));
        setDeleteCardPopupOpen(false);
      })
      .catch((err) => console.log(`При удалении карточки: ${err}`));
  };

  return (
    <>
      {" "}
      <Main
        cards={cards}
        onEditeProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        selectedCard={selectedCard}
        onCardDelete={handleCardDeleteRequest}
      />
      <Footer />
      <InfoTooltip
        isOpen={!!tooltipStatus}
        onClose={closeAllPopups}
        status={tooltipStatus}
      />
      {/* <PopupWithForm
        title="Вы уверены?"
        name="delete-card"
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        buttonText="Да"
        onSubmit={handleCardDelete}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddCard={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup selectedCard={selectedCard} onClose={closeAllPopups} /> */}
    </>
  );
}

export default Home;
