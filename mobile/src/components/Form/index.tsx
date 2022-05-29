import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
 } from 'react-native';
import * as fileSystem from 'expo-file-system';
import { theme } from '../../theme';
import { FeedbackType } from '../Widget';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Screenshot } from '../Screenshot';
import { Button } from '../Button';
import { captureScreen } from "react-native-view-shot"
import { api } from '../../libs/api';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({feedbackType, onFeedbackCanceled, onFeedbackSent}: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  
  const [screenshot, setScreenshot] = useState<string | null>(null);
  
  const [comment, SetComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType]
  
  function handleScreenshot(){
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(uri=>setScreenshot(uri))
    .catch(err=>console.log(err))
  }
  function handleScreenshotRemove(){
    setScreenshot(null)
  }
  
  async function handleSendFeedback(){
    if(isSendingFeedback) return
    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot  && 
    await fileSystem.readAsStringAsync(screenshot, {encoding:'base64'});
    try{
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      })
      onFeedbackSent()
    }catch(err){
      setIsSendingFeedback(false)
      console.log(err)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image}/>
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo"
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={SetComment}
      />

      <View style={styles.footer}>
        < Screenshot
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot= {screenshot}
        />
        <Button 
        onPress={handleSendFeedback}
        isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}