import React, { useState } from 'react';
import { FaStar, FaUser, FaThumbsUp } from 'react-icons/fa';

const ReviewSystem = ({ productId, reviews = [], onAddReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      helpful: 0
    };
    onAddReview(productId, review);
    setNewReview({ rating: 5, title: '', comment: '', name: '' });
    setShowForm(false);
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return (
      <div className="stars">
        {[1,2,3,4,5].map(star => (
          <FaStar
            key={star}
            className={`star ${star <= rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="review-system">
      <div className="review-summary">
        <h3>Reseñas ({reviews.length})</h3>
        {reviews.length > 0 && (
          <div className="rating-summary">
            {renderStars(Math.round(avgRating))}
            <span className="avg-rating">{avgRating.toFixed(1)} de 5</span>
          </div>
        )}
        <button 
          className="add-review-btn"
          onClick={() => setShowForm(!showForm)}
        >
          Escribir Reseña
        </button>
      </div>

      {showForm && (
        <form className="review-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tu calificación</label>
            {renderStars(newReview.rating, true, (rating) => 
              setNewReview({...newReview, rating})
            )}
          </div>
          <div className="form-group">
            <input
              placeholder="Tu nombre"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Título de la reseña"
              value={newReview.title}
              onChange={(e) => setNewReview({...newReview, title: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Escribe tu reseña..."
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              rows="4"
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
            <button type="submit">Publicar Reseña</button>
          </div>
        </form>
      )}

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-info">
                <FaUser className="avatar" />
                <div>
                  <strong>{review.name}</strong>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              {renderStars(review.rating)}
            </div>
            <h4>{review.title}</h4>
            <p>{review.comment}</p>
            <button className="helpful-btn">
              <FaThumbsUp /> Útil ({review.helpful})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSystem;