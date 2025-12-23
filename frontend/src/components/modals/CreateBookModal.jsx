import { useState, useRef, useEffect } from "react"
import {
  Plus,
  Sparkles,
  Trash2,
  ArrowLeft,
  BookOpen,
  Hash,
  Lightbulb,
  Palette 
} from "lucide-react"

import Modal from "../ui/Modal"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import Button from "../ui/Button"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPath"
import toast from "react-hot-toast"
import {useAuth} from "../../context/AuthContext"

const CreateBookModal = ({isOpen, onClose, onBookCreated}) => {

  const {user} = useAuth();

  const [step, setStep] = useState(1)
  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setAiTopic] = useState("");
  const [setAiTopic, setAiTopic] = useState("");
  

  return (
    <div>CreateBookModal</div>
  )
}

export default CreateBookModal